import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { ItemModel } from '../../models/item.model';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  private itemCollection: AngularFirestoreCollection<ItemModel>;
  items: Observable<ItemModel[]>;

  constructor(public navCtrl: NavController, private afs: AngularFirestore) { }

  ionViewDidLoad() {
    this.itemCollection = this.afs.collection<ItemModel>('items');
    this.items = this.itemCollection.valueChanges();
  }

}
