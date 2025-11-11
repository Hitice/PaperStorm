import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) {}

  addItem(collection: string, data: any): Observable<void> {
    return this.auth.user.pipe(
      switchMap(user => {
        if (!user) throw new Error('User not authenticated');
        const docRef = this.firestore.collection(collection).doc();
        const payload = { ...data, id: docRef.ref.id, userId: user.uid, createdAt: new Date() };
        return from(docRef.set(payload));
      })
    );
  }

getItems(collection: string): Observable<any[]> {
  return this.auth.user.pipe(
    switchMap(user => {
      if (!user) throw new Error('User not authenticated');
      return this.firestore
        .collection(collection, ref => ref.where('userId', '==', user.uid).orderBy('createdAt', 'desc'))
        .snapshotChanges()
        .pipe(
          map(actions =>
            actions.map(a => {
              const data = a.payload.doc.data() as any; // Cast para evitar erro de tipo
              const id = a.payload.doc.id;
              return { id, ...data };
            })
          )
        );
    })
  );
}

  deleteItem(collection: string, id: string): Observable<void> {
    return from(this.firestore.collection(collection).doc(id).delete());
  }
}
