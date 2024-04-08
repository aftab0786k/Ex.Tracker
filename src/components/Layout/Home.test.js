import { render, screen } from "@testing-library/react"
import Home from "./Home";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from '../../store/index';

describe("Home Component", ()=>{
    test('Renders "welcome to expense tracky" as a text', ()=>{
        //Arrange
        render(
            <Router>
                <Provider store={store}>
                    <Home />
                </Provider>
            </Router>
        );

        //Act
        //...nothing

        //Assert
        const welcomeElement = screen.getByText("welcome to expense tracky", {exact: false});
        expect(welcomeElement).toBeInTheDocument();
    });
    test('Renders "your profile is incomplete" as a text', ()=>{
        render(
            <Router>
                <Provider store={store}>
                    <Home />
                </Provider>
            </Router>
        );
        const outputText = screen.getByText("your profile is incomplete", {exact: false});
        expect(outputText).toBeInTheDocument();
    });
});