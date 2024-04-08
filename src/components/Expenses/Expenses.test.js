import { render, screen } from "@testing-library/react";
import Expenses from "./Expenses";
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store/index';

describe("Expenses Component", ()=>{
    test("Rendering expense items", async()=>{
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async()=> [{id: "i1", category: "Food", description: "To eat", price: "100"}],
        });
        render(<Router>
                <Provider store={store}>
                    <Expenses />
                </Provider>
            </Router>
        );
        
        const item = await screen.findAllByRole("row");
        expect(item).not.toHaveLength(0);
    });
});