import "./App.css";

// Other Components
import Reminders from "./components/Reminders";
import Header from "./components/Header";
import AddReminder from "./components/AddReminder";

//React Router
import { BrowserRouter, Route, Switch } from "react-router-dom";


function App() {

    return (
        <div className="app">
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/" exact>
                        <Reminders />
                    </Route>
                    <Route path="/add-reminder" component={AddReminder} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
