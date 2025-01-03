import IAccountListProps from "@/interface/AccountList"
import { Fragment } from "react/jsx-runtime"
import CardAccount from "../common/CardAccount"
import CardAccountCourse from "../common/CardAccountCourse"

function AccountList({ account, course }: IAccountListProps) {
    if (!course) {
        return account.length > 0 ? (
            account.map((a) => {
                return (
                    <Fragment key={a.id_account}>
                        <CardAccount
                            id_account={a.id_account}
                            name={a.name}
                            last_name={a.lastName}
                            email={a.email}
                            avatar={a.avatar}
                        />
                    </Fragment>
                )
            })
        ) : (
            <p className="text-center text-2xl font-bold mt-10">There aren't any account</p>
        )
    } else {
        return account.length > 0 ? (
            account.map((a) => {
                return (
                    <Fragment key={a.id_account}>
                        <CardAccountCourse
                            id_account={a.id_account}
                            name={a.name}
                            last_name={a.lastName}
                            email={a.email}
                            avatar={a.avatar}
                        />
                    </Fragment>
                )
            })
        ) : (
            <p className="text-center text-2xl font-bold mt-10">There aren't any account</p>
        )
    }
}

export default AccountList