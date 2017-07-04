# ngx-youtube

Youtube API for Angular2, using google oAuth2. Compatible with latest release of AngularJs

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Before starting to use fresh module make sure you have already created your client-id, if you don't have the ID please see [here](https://help.aolonnetwork.com/hc/en-us/articles/218079623-How-to-Create-Your-YouTube-API-Credentials).
If you are going to create client-id for hybrid apps like ionic, then make sure you have add "restrictions" like 
* http://localhost:8100
* http://localhost:35729
* http://192.168.1.1:8100

### Installing

```
npm install ngx-youtube
```


## Configuration

After installation connect YTApiModule the top of your main app module
```
import { YTApiModule } from 'ngx-youtube';
```
and connect it in imports section with clientID 
```
@NgModule({
imports: [
    YTApiModule.setConfig(
          {
            clientId: "xxxxx-yyyyyy.apps.googleusercontent.com",
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"],
            scope: "https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner"
          }
        )
    ]
})
```

### How to use

Now you can connect YT service to your every component

```
import {YTApiService} from 'ngx-youtube'
export class TestPage {
@Component({
  selector: '......',
  templateUrl: '....'
})
constructor(private YTS: YTApiService) {}

doSearch(keyword){
    let request = this.YTS.search(keyword, 25, 'video');
    request.execute(res=>{
        console.log(res);
    }):
}
```

## Possible functions

#### auth()
function to do Authorization 

| parameters | type | 
| --- | --- | 
| `event`| required |

```
<button (click)="doLogin($event)">Authorize</button>
.......
doLogin(ev){
    console.log(this.YTS.auth(ev));
  }
```

#### search()
| parameters | type | Description |
| --- | --- | --- |
| `keyword`| required | keyword which need to be search. example  **car** |
| `limit` | required | The limit of result. example **25** |
| `type` | required | The type of search result. example **'video'/'channel'** |
| `part` | optional | The information of search result. example **'snippet'** |

#### getChannelByID()
| parameters | type | Description |
| --- | --- | --- |
| `ID`| required | Channel ID which need to be find. example  **UCPg3xfvygstC-AkG2Fg3ZXw** |
| `part` | optional | The information of search result. example **'snippet'/'snippet,statistics'** |
```
let YT_channel = this.YTS.getChannelByID(channel_ID,'snippet,statistics');
```
#### getVideosByID()
| parameters | type | Description |
| --- | --- | --- |
| `ID`| required | Video ID or multiple ID's as string. example  **'4vkc-Lbcl64'/'Ks-_Mh1QhMc,c0KYU2j0TM4,eIho2S0ZahI'** |
| `part` | optional | The information of search result. example **'snippet'/'snippet,statistics'/'snippet,contentDetails,statistics'** |
```
 let YT_video_detailed = this.YTS.getVideosByID(videoId,'snippet,statistics');
```
#### getMostPopular()

funtion will return most popular videos based on **region** and **categoryID**

| parameters | type | Description |
| --- | --- | --- |
| `regionCode`| required | The region from where need to get most popular videos. example  **'AM'** |
| `videoCategoryId`| required | The category from where need to get most popular videos. example  **17**. To see all categories by ID see [here](https://gist.github.com/dgp/1b24bf2961521bd75d6c)|
| `part` | optional | The information of search result. example **'snippet'/'snippet,statistics'/'snippet,contentDetails,statistics'** |

#### getAuthLiked()

funtion will return liked videos which are liked from authorized user

| parameters | type | Description |
| --- | --- | --- |
| `part` | optional | The information of search result. example **'snippet'/'snippet,statistics'/'snippet,contentDetails,statistics'** |

## Deployment

Sorry, but this option is not possible for now 

## Version - 1.1.0

We are working harder to get all need functionlity in one module, so functionlity will be updated suddenly. 

## Author

* **Hayk Abrahamyan** - *Initial work* - [devabrahamyan](https://github.com/devabrahamyan)


## License

This project is licensed under the ISC License - see the [LICENSE](https://opensource.org/licenses/ISC) for details

## ThankYou
Thank you for your support and udnerstanding, new functions will be updated soon.

