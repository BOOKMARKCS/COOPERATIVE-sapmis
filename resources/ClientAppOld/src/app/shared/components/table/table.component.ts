import {Component, Input} from '@angular/core';
import {
    NftAuctionsTableItemComponent
} from "../../../modules/dashboard/components/nft/nft-auctions-table-item/nft-auctions-table-item.component";
import {CurrencyPipe, NgForOf, NgOptimizedImage} from "@angular/common";
import {Nft} from "../../../modules/dashboard/models/nft";
import {SvgIconComponent} from "angular-svg-icon";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    NftAuctionsTableItemComponent,
    NgForOf,
    CurrencyPipe,
    SvgIconComponent,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.sass'
})
export class TableComponent {
  @Input() data: any

  constructor() {
    // this.activeAuction = [
    //   {
    //     id: 1346771,
    //     title: 'Cripto Cities',
    //     creator: 'Jenny Wilson',
    //     image:
    //       '/assets/images/img-02.jpg',
    //     avatar: 'https://preview.keenthemes.com/metronic8/demo1/assets/media/avatars/300-13.jpg',
    //     ending_in: '1h 43m 52s',
    //     last_bid: 22.0,
    //     price: 35330.9,
    //     instant_price: 22.0,
    //   },
    //   {
    //     id: 1346772,
    //     title: 'Lady Ape Club',
    //     creator: 'Jenny Wilson',
    //     image:
    //       '/assets/images/img-02.jpg',
    //     avatar: 'https://preview.keenthemes.com/metronic8/demo1/assets/media/avatars/300-13.jpg',
    //     ending_in: '2h 00m 02s',
    //     last_bid: 2.8,
    //     price: 4812.72,
    //     instant_price: 2.9,
    //   },
    //   {
    //     id: 1346780,
    //     title: 'The King - Gordon Ryan',
    //     creator: 'Jenny Wilson',
    //     image:
    //       '/assets/images/img-02.jpg',
    //     avatar: 'https://preview.keenthemes.com/metronic8/demo1/assets/media/avatars/300-13.jpg',
    //     ending_in: '1h 05m 00s',
    //     last_bid: 1.0,
    //     price: 1602.77,
    //     instant_price: 2.9,
    //   },
    //   {
    //     id: 1346792,
    //     title: 'Only by Shvembldr',
    //     creator: 'Jenny Wilson',
    //     image:
    //       '/assets/images/img-02.jpg',
    //     avatar: 'https://preview.keenthemes.com/metronic8/demo1/assets/media/avatars/300-13.jpg',
    //     ending_in: '1h 05m 00s',
    //     last_bid: 2.0,
    //     price: 1438.17,
    //     instant_price: 2.1,
    //   },
    //   {
    //     id: 1346792,
    //     title: 'Crypto Coven',
    //     creator: 'Jenny Wilson',
    //     image:
    //       '/assets/images/img-02.jpg',
    //     avatar: 'https://preview.keenthemes.com/metronic8/demo1/assets/media/avatars/300-13.jpg',
    //     ending_in: '1h 05m 00s',
    //     last_bid: 0.8,
    //     price: 1278.38,
    //     instant_price: 0.35,
    //   },
    // ];
  }
}
