import "./App.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primeicons/primeicons.css";

import { TabView, TabPanel } from "primereact/tabview";

import MonsterAttack from "./components/MonsterAttack";
import RechargeAction from "./components/RechargeAction";
import SuperHighlight from "./components/SuperHighlight";

function App() {
    return (
        <>
        <h1>D&D Beyond Utilities</h1>
            <TabView>
                <TabPanel header="Monster Attack Actions">
                    <MonsterAttack />
                </TabPanel>
                <TabPanel header="Monster Save Actions">
                    <RechargeAction />
                </TabPanel>
                <TabPanel header="Super Tooltip">
                    <SuperHighlight />
                </TabPanel>
            </TabView>
        </>
    );
}

export default App;
