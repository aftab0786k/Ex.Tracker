import { render, screen } from "@testing-library/react";
import ForgotPassword from "./ForgotPassword";

describe("Forgot Password Component", ()=>{
    test("renders forgot password text", ()=>{
        //Arrange
        render(<ForgotPassword />);

        //Act
        //...nothing

        //Assert
        const forgotPassword = screen.getByText("forgot password", {exact: false});
        expect(forgotPassword).toBeInTheDocument();
    });
});