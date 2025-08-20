import "./App.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";

import { TabView, TabPanel } from "primereact/tabview";

import MonsterAttack from "./components/MonsterAttack";
import RechargeAction from "./components/RechargeAction";
import SuperHighlight from "./components/SuperHighlight";

function App() {
    return (
        <>
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
