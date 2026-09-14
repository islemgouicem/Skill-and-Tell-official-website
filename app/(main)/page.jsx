import { getManagers } from "./features/apis/get-mangers";
import AppClient from "./AppClient";

export default async function Page() {
    const teamMembers = await getManagers();

    return <AppClient teamMembers={teamMembers} />;
}