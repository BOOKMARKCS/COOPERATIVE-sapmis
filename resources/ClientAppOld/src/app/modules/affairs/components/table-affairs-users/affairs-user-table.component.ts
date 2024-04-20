import {Component, Input, OnInit} from '@angular/core';
import {
  NftAuctionsTableItemComponent
} from "../../../dashboard/components/nft/nft-auctions-table-item/nft-auctions-table-item.component";
import {CurrencyPipe, JsonPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Nft} from "../../../dashboard/models/nft";
import {SvgIconComponent} from "angular-svg-icon";
import {RouterLink} from "@angular/router";
import {environment} from "../../../../../environments/environment";
import {AddUserComponent} from "../../users/add-user/add-user.component";

@Component({
  selector: 'app-table-affairs-users',
  standalone: true,
  imports: [
    NftAuctionsTableItemComponent,
    NgForOf,
    CurrencyPipe,
    SvgIconComponent,
    RouterLink,
    NgOptimizedImage,
    JsonPipe,
    NgIf,
    AddUserComponent
  ],
  templateUrl: './affairs-user-table.component.html',
  styleUrl: './table-affairs-users.component.sass'
})
export class AffairsUserTableComponent  {
  @Input() data: any
  protected readonly environment = environment;
}
