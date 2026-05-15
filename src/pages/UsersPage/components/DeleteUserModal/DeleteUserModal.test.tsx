import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Modal } from "@components/shared";
import { DeleteUserModal } from "./DeleteUserModal";

const showModalMock = vi.fn(function (this: HTMLDialogElement) {
  this.open = true;
});
const closeMock = vi.fn(function (this: HTMLDialogElement) {
  this.open = false;
});
let originalShowModal: typeof HTMLDialogElement.prototype.showModal | undefined;
let originalClose: typeof HTMLDialogElement.prototype.close | undefined;

const mutateMock = vi.fn();

vi.mock("../../api", () => ({
  useDeleteUserApi: () => ({ mutate: mutateMock }),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe("DeleteUserModal", () => {
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

  it("submits delete mutation with user id", async () => {
    const user = userEvent.setup();

    render(
      <Modal>
        <DeleteUserModal userId="user-z" firstName="Taylor" lastName="Jones" />
      </Modal>,
    );

    await user.click(screen.getByRole("button", { name: "page.users.deleteUser" }));

    expect(screen.getByText("Taylor Jones")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "page.users.confirm" }));

    expect(mutateMock).toHaveBeenCalledWith("user-z");
  });
});
