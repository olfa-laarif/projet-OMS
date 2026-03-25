import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MerchantRegisteredEvent } from '../events/merchant-registered.event';

@Injectable()
export class MerchantRegisteredListener {
    @OnEvent('merchant.registered')
    handle(event: MerchantRegisteredEvent) {
        console.log(`[Event] merchant.registered — id: ${event.merchantId}, email: ${event.email}, name: ${event.name}`);

    }
}
