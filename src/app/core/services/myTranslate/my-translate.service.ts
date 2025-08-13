import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {

  constructor( private translateService : TranslateService, private rendererFactory: RendererFactory2, @Inject(PLATFORM_ID) private platformId : object) {

    if(isPlatformBrowser(platformId)){
      this.renderer = rendererFactory.createRenderer(null, null);

      // 1) Set default language
      translateService.setDefaultLang('en')

      // 2) Get language from localStorage
      let savedLang = localStorage.getItem('myLang')

      // 3) Use language if found
      if(savedLang){
        translateService.use(savedLang!)
      }

      // Change Direction
      this.changeDirection()
    }

  }

  private renderer ?: Renderer2;

  // changeDirection():void{
  //   if(localStorage.getItem('myToken') === 'en'){
  //     // dir ltr
  //     document.documentElement.setAttribute('dir','ltr')
  //           document.documentElement.setAttribute('lang','en')

  //   }
  //   else if(localStorage.getItem('myToken') === 'ar'){
  //     // dir rtl
  //     document.documentElement.setAttribute('dir', 'rtl')
  //     document.documentElement.setAttribute('lang','ar')
  //   }
  // }

    changeDirection(): void {
    const htmlElement = document.documentElement;

    const lang = localStorage.getItem('myToken');
    if (lang === 'en') {
      // dir ltr
      this.renderer!.setAttribute(htmlElement, 'dir', 'ltr');
      this.renderer!.setAttribute(htmlElement, 'lang', 'en');
    }else if (lang === 'ar') {
        // dir rtl
        this.renderer!.setAttribute(htmlElement, 'dir', 'rtl');
        this.renderer!.setAttribute(htmlElement, 'lang', 'ar');
    }
  }
}
