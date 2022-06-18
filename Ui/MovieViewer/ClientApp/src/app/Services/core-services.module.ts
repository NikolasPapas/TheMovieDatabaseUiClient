import { ModuleWithProviders, NgModule, Optional, SkipSelf } from "@angular/core";
import { CoreService } from "./core-service";


@NgModule({})
export class CoreServiceModule {
	constructor(@Optional() @SkipSelf() parentModule: CoreServiceModule) {
		if (parentModule) {
			throw new Error(
				'CoreModule is already loaded. Import it in the AppModule only');
		}
	}
	static forRoot(): ModuleWithProviders<CoreServiceModule> {
		return {
			ngModule: CoreServiceModule,
			providers: [
				CoreService,
			]
		};
	}
}