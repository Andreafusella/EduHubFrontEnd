import { ComponentProps } from "react";

export default interface IDialogNewAccount extends ComponentProps<"dialog">{
    handleOpenDialog: () => void
    open: boolean
}