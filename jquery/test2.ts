//import $ from "jquery";
// CommonJs 모듈인 jquery 패이키지 import할 수 있는 것은 tsconfig.json에서 esModuleInterop옵션이 true로 설정되어 있기 때문이다.
//false로 바꾸면 에러가 발생하는데 false인 상태로 import하려면 다음과 같은 문법을 써야한다.

import $ = require("jquery");
// 하지만 대부분 esModuleInterop옵션이 true로 설정하고 import하는 경우가 많다.
