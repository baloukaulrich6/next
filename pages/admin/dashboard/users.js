import Layout from "../../../components/admin/layout";
import EnhancedTable from "../../../components/admin/usres/tables";
import db from '../../../utils/db' 
import User from "../../../models/User"
export default function users({ users }){
    return (<Layout>
        <EnhancedTable rows ={users}/>
    </Layout>)
}

export async function getServerSideProps(ctx){
    await db.connectDb()
    const users = await User.find({}).sort({ createdAt: -1}).lean()
    return {
        props: {
            users: JSON.parse(JSON.stringify(users))
        }
    }
}