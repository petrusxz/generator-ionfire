import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { ItemModel } from '../../models/item.model';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {

  private item: ItemModel = new ItemModel;
  private itemDoc: AngularFirestoreDocument<ItemModel>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: AngularFirestore, private camera: Camera) {
  }

  ionViewDidLoad(): void {
    this.item = this.navParams.get('item');
  }

  takePicture(): void {
    const options: CameraOptions = {
      quality: 50,
      targetHeight: 600,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    }

    this.camera.getPicture(options)
      .then(photo => {
        this.item.picture = `data:image/jpeg;base64,${photo}`;
      })
      .catch(error => {
        console.log(error);
      });
  }

  saveItem(item: ItemModel): void {
    if (!item.id) {
      this.item.id = this.afs.createId();
      const itemCollection = this.afs.collection<ItemModel>('items');
      itemCollection.add(this.item);
    } else {
      this.itemDoc.update(this.item);
    }
  }

}
