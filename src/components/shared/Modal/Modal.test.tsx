import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Modal } from "./Modal";

const showModalMock = vi.fn(function (this: HTMLDialogElement) {
  this.open = true;
});
const closeMock = vi.fn(function (this: HTMLDialogElement) {
  this.open = false;
});
let originalShowModal: typeof HTMLDialogElement.prototype.showModal | undefined;
let originalClose: typeof HTMLDialogElement.prototype.close | undefined;

describe("Modal", () => {
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

  it("opens and renders content when trigger is clicked", async () => {
    const user = userEvent.setup();

    render(
      <Modal>
        <Modal.Trigger>Open modal</Modal.Trigger>
        <Modal.Content>
          <Modal.Header>Modal title</Modal.Header>
          <Modal.Body>Body content</Modal.Body>
        </Modal.Content>
      </Modal>,
    );

    await user.click(screen.getByRole("button", { name: "Open modal" }));

    expect(showModalMock).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Modal title")).toBeInTheDocument();
    expect(screen.getByText("Body content")).toBeInTheDocument();
    expect(document.body).toHaveClass("scroll-hidden");
  });

  it("closes when close button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <Modal>
        <Modal.Trigger>Open modal</Modal.Trigger>
        <Modal.Content>
          <Modal.Close>Close modal</Modal.Close>
        </Modal.Content>
      </Modal>,
    );

    await user.click(screen.getByRole("button", { name: "Open modal" }));
    await user.click(screen.getByRole("button", { name: "Close modal" }));

    expect(closeMock).toHaveBeenCalledTimes(1);
    expect(document.body).not.toHaveClass("scroll-hidden");
  });

  it("closes when clicking backdrop", async () => {
    const user = userEvent.setup();

    render(
      <Modal>
        <Modal.Trigger>Open modal</Modal.Trigger>
        <Modal.Content>Modal body</Modal.Content>
      </Modal>,
    );

    await user.click(screen.getByRole("button", { name: "Open modal" }));

    const dialog = screen.getByText("Modal body").closest("dialog");
    expect(dialog).toBeInTheDocument();

    if (!dialog) {
      throw new Error("Dialog is not found");
    }

    fireEvent.click(dialog, { target: dialog });

    expect(closeMock).toHaveBeenCalledTimes(1);
  });

  it("closes on dialog cancel event", async () => {
    const user = userEvent.setup();

    render(
      <Modal>
        <Modal.Trigger>Open modal</Modal.Trigger>
        <Modal.Content>Modal body</Modal.Content>
      </Modal>,
    );

    await user.click(screen.getByRole("button", { name: "Open modal" }));

    const dialog = screen.getByText("Modal body").closest("dialog");
    expect(dialog).toBeInTheDocument();

    if (!dialog) {
      throw new Error("Dialog is not found");
    }

    fireEvent(
      dialog,
      new Event("cancel", {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(closeMock).toHaveBeenCalledTimes(1);
  });
});
