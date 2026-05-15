import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Modal } from "@components/shared";
import { CreateUserModal } from "./CreateUserModal";

const showModalMock = vi.fn(function (this: HTMLDialogElement) {
  this.open = true;
});
const closeMock = vi.fn(function (this: HTMLDialogElement) {
  this.open = false;
});
let originalShowModal: typeof HTMLDialogElement.prototype.showModal | undefined;
let originalClose: typeof HTMLDialogElement.prototype.close | undefined;

vi.mock("../../api", () => ({
  useCreateUserApi: () => ({ mutate: vi.fn() }),
  useGetDepartmentsApi: () => ({ data: [{ id: "d1", name: "Dept" }] }),
  useGetPositionsApi: () => ({ data: [{ id: "p1", name: "Pos" }] }),
}));

vi.mock("@root/hooks", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@root/hooks")>();

  return {
    ...actual,
    useAuth: () => ({
      userId: "admin-user",
      isAdmin: true,
      isAuthenticated: true,
      isFirstLoad: false,
      isVerified: true,
    }),
  };
});

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe("CreateUserModal", () => {
  beforeEach(() => {
    originalShowModal = HTMLDialogElement.prototype.showModal;
    originalClose = HTMLDialogElement.prototype.close;

    Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
      configurable: true,
      writable: true,
      value: showModalMock,
    });
    Object.defineProperty(HTMLDialogElement.prototype, "close", {
      configurable: true,
      writable: true,
      value: closeMock,
    });

    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.classList.remove("scroll-hidden");
    showModalMock.mockClear();
    closeMock.mockClear();

    if (originalShowModal) {
      Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
        configurable: true,
        writable: true,
        value: originalShowModal,
      });
    } else {
      Reflect.deleteProperty(HTMLDialogElement.prototype, "showModal");
    }

    if (originalClose) {
      Object.defineProperty(HTMLDialogElement.prototype, "close", {
        configurable: true,
        writable: true,
        value: originalClose,
      });
    } else {
      Reflect.deleteProperty(HTMLDialogElement.prototype, "close");
    }
  });

  it("opens create form when trigger is clicked", async () => {
    const user = userEvent.setup();

    render(
      <Modal>
        <CreateUserModal />
      </Modal>,
    );

    await user.click(screen.getByRole("button", { name: "page.users.createUser" }));

    expect(screen.getByText("page.users.createUserTitle")).toBeInTheDocument();
  });
});
