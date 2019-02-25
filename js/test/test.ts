import { Origin } from '../../utils/origin/Origin';
import { PageView } from '../../utils/pageview';
import { Watch } from '../../utils/origin/watch/Watch';

@PageView()
@Watch()
class TestPage extends Origin {

  /**
   * 在data中声明变量
   */
  data: {

  }

  /**
   * 启动函数
   */
  orOnInit() {

  }

}
