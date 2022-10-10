import { useEffect, useState } from 'react';
import { IonSearchbar, IonContent, IonInfiniteScroll, IonInfiniteScrollContent  } from '@ionic/react';
import { IonAvatar, IonItem, IonLabel,IonList, IonThumbnail } from '@ionic/react';
import HttpService from '../api/http';
import { IUsersItem } from '../interface/interface';
import './users.css';

const Users: React.FC = () => {
    //  set store
    const [userList, setUserList] = useState<any>([]);
    // create http client
    const httpClient = new HttpService();
    // how to handel side effects
    useEffect(() => {
        // api url https://dummyjson.com/users
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
        <>
        
            <IonSearchbar></IonSearchbar>
            <IonContent
        className="ion-padding"
        scrollEvents={true}
        onIonScrollStart={_e => {
          console.log(_e);
        }}
        onIonScroll={() => {}}
        onIonScrollEnd={() => {}}
      >
            <IonList>
                {userList && userList.map((user: IUsersItem) =>
                    <IonItem key={user.id} onClick={() => alertUser(user)}>
                        <IonAvatar slot="start">
                            <img alt="Silhouette of a person's head" src={user.image} />
                        </IonAvatar>
                        <IonLabel>
                            {user.firstName}
                        </IonLabel>
                    </IonItem>
                )}
            </IonList>
            </IonContent>
        </>);
}

export default Users;