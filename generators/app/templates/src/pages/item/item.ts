import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import { ItemModel } from '../../models/item.model';

import { ToastService } from '../../services/toast.service';
import { LoadingService } from '../../services/loading.service';

@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {

  private item: ItemModel = new ItemModel;
  private itemsCollection: AngularFirestoreCollection<ItemModel>;
  private itemDoc: AngularFirestoreDocument<ItemModel>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: AngularFirestore, private camera: Camera,
    private toastService: ToastService, private loadingService: LoadingService) {
  }

  ionViewDidLoad(): void {
    const selectedItem = this.navParams.get('item');

    console.log(selectedItem);
    if(selectedItem)
      this.item = selectedItem;
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
    this.loadingService.presentLoading();
    
    if (!item.id) {
      this.item.id = this.afs.createId();
      this.item.creationDate = new Date();
      this.itemsCollection = this.afs.collection<ItemModel>('items');
      this.itemsCollection.doc(this.item.id).set(Object.assign({}, this.item))
        .then(() => {
          this.toastService.presentToast('Item added.');
          this.loadingService.dissmissLoading();
          this.navCtrl.pop();
        });
    } else {
      this.itemDoc = this.afs.doc<ItemModel>(`items/${this.item.id}`);
      this.itemDoc.update(Object.assign({}, this.item));
      this.toastService.presentToast('Item updated.');
      this.loadingService.dissmissLoading();
      this.navCtrl.pop();
    }
  }

}
