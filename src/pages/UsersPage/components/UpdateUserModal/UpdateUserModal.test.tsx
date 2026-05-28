import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Modal } from "@components/shared";
import { UserRole } from "@services/graphql/__generated__/graphql";
import { UpdateUserModal } from "./UpdateUserModal";

const showModalMock = vi.fn(function (this: HTMLDialogElement) {
  this.open = true;
});
const closeMock = vi.fn(function (this: HTMLDialogElement) {
  this.open = false;
});
let originalShowModal: typeof HTMLDialogElement.prototype.showModal | undefined;
let originalClose: typeof HTMLDialogElement.prototype.close | undefined;

vi.mock("../../api", () => ({
  useUpdateUserApi: () => ({ mutateAsync: vi.fn() }),
  useUpdateProfileApi: () => ({ mutateAsync: vi.fn() }),
  useGetDepartmentsApi: () => ({ data: { items: [] } }),
  useGetPositionsApi: () => ({ data: { items: [] } }),
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

describe("UpdateUserModal", () => {
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

  it("opens form header when trigger is clicked", async () => {
    const user = userEvent.setup();

    render(
      <Modal>
        <UpdateUserModal
          userId="user-1"
          email="a@b.com"
          firstName="Sam"
          lastName="Lee"
          departmentId="d1"
          positionId="p1"
          role={UserRole.Employee}
        />
      </Modal>,
    );

    await user.click(screen.getByRole("button", { name: "page.users.updateUser" }));

    expect(screen.getByText("page.users.updateUserTitle")).toBeInTheDocument();
    expect(screen.getByDisplayValue("a@b.com")).toBeInTheDocument();
  });
});
