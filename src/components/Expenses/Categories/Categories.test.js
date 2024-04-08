import { render, screen } from "@testing-library/react";
import Categories from "./Categories";
import { Provider } from "react-redux";
import store from "../../../store/index";

describe("Categories Component", ()=>{
    test("Renders list items", async()=>{
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async ()=> [{id: 'c1', title: "First Category"}],
        });
        render(
            <Provider store={store}>
                <Categories />
            </Provider>
        );

        const listItemElements = await screen.findAllByRole('listitem');
        expect(listItemElements).not.toHaveLength(0);
    });
});