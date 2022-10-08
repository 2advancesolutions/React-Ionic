import { FunctionComponent, useEffect, useState } from 'react';
import { IonItem, IonLabel, IonList } from '@ionic/react';

import HttpService from '../api/http';
import { IUsersItem } from '../interface/interface';
import './users.css';

const Users: FunctionComponent = () => {
    //  set store
    const [userList, setUserList] = useState<any>([]);
    // create http client
    const httpClient = new HttpService();
    // how to handel side effects
    useEffect(() => {
        // api url https://dummyjson.com/products
        httpClient.get('users')
            .then((data: any) => {
                setUserList(data.users);
            })
    }, []);

    // functions
    const alertUser = (user: IUsersItem) => {
        alert(user.firstName);
    }

    return (
        <div>
            <IonList>
                {/* how loop in react */}
                {userList && userList.map((user: IUsersItem) =>
                    // how you add click event
                        <IonItem key={user.id} onClick={() => alertUser(user)}>
                            {user.firstName}
                        </IonItem>
                )}
            </IonList>
        </div>);
}

export default Users;