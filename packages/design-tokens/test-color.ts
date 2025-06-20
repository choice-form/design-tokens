import { color } from './src/helpers/colors';

// 测试类型检查
const test1 = color("bg.default");  // ✅ 应该正确
const test2 = color("bg.def");      // ❌ 应该报错了！
