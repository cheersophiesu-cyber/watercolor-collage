# Watercolor Collage

> 一张照片，两种观看方式：上半幅留住真实瞬间，下半幅把它变成一页安静的水彩拼贴诗。

[中文](#中文版) · [English](#english-version)

## 中文版

### 这是什么？

**Watercolor Collage** 是一个 Codex 图片生成 Skill。它将你上传的宠物、人物或日常摄影制作成一张竖版 2:3 双画面艺术海报：原照片完整保留在上方，下方以低饱和水彩、手工纸拼贴和旧版印刷质感重新转译同一个瞬间，并根据画面写下一句短诗。

### 它会生成什么

| 上半画面 | 下半画面 |
| --- | --- |
| 保留原照片的主体、姿态、环境、光线与抓拍感 | 将同一主体转译为极简水彩与撕纸拼贴 |
| 等比铺满上半画面，围绕主体智能裁切，绝不拉伸或压扁 | 从原照片提取低饱和自然色彩 |
| 不重画、不换脸、不改变动作 | 保留毛色、服装、朝向、表情与关键配饰 |
| 不添加文字或装饰 | 在留白中加入一句与现场有关的原创英文短诗 |

最终成片像一页独立艺术杂志、旧版诗集或私人收藏册：真实与手作并置，安静、克制，同时仍然一眼认得照片里的人与动物。

### 视觉特征

- 竖版 `2:3`，上下清晰分割的双画面构图
- 上半幅约占 `45%–50%`，保留真实摄影质感
- 下半幅约占 `50%–55%`，使用米白纤维艺术纸背景
- 透明水彩色层、干涩笔触、撕纸边缘与版画油墨质感
- 轻微套印偏差、缺墨、磨损和不完整边缘
- 主体小而集中，四周保留大面积呼吸感留白
- 从照片中选择少量花朵、水面、草地、树影、玩具或栏杆等场景线索
- 一句安静、温柔、与具体动作或环境有关的原创英文诗句
- 拒绝光滑数字插画、卡通矢量描边、厚涂油画和甜美水彩滤镜感

### 适合这些照片

- 宠物的日常瞬间与纪念影像
- 人与宠物一起散步、玩耍或安静相处的照片
- 旅行、野餐、花园、海边与自然场景
- 想做成手机壁纸、艺术海报或私人诗页的生活摄影

### 安装

#### 方法一：让 Codex 自动安装

直接把下面这句话发给 Codex：

```text
请帮我安装这个 GitHub 链接中的 Skill：https://github.com/cheersophiesu-cyber/watercolor-collage
```

#### 方法二：手动安装

下载仓库，并将整个文件夹放入 Codex Skills 目录：

```text
~/.codex/skills/watercolor-collage
```

如果没有立即显示，请重新启动 Codex。

### 使用方法

上传一张照片，然后按名称调用：

```text
使用 $watercolor-collage 把这张照片生成一张水彩拼贴双画面艺术海报
```

也可以补充你希望诗句关注的内容：

```text
使用 $watercolor-collage 生成海报，英文短诗围绕它回头看我的瞬间来写
```

Skill 会自动分析照片中的主体数量、身份特征、动作方向、色彩和关键环境元素，再生成一张高清竖版成片。使用时需要可接收参考图片的图像生成或图像编辑能力。

### 它会坚持保留什么

Watercolor Collage 的重点不是给照片套滤镜，而是在不丢失记忆细节的前提下进行第二次视觉表达。它会特别检查：

- 不遗漏、合并或复制人物和宠物
- 不改变主体的动作、方向与相对位置
- 准确保留毛色、服装主色、表情和辨识特征
- 上半画面不被重绘或风格化
- 上半画面由确定性合成脚本按原始宽高比嵌入，绝不横向或纵向拉伸
- 以上半画面铺满为默认，通过调整裁切焦点尽量保留人物、宠物、四肢、尾巴和关键配饰
- 下半画面保持克制留白，不完整重画原背景
- 画面中只出现一句拼写正确的原创短诗

### 文件结构

- `SKILL.md`：生成工作流、构图规则与质量检查标准
- `agents/openai.yaml`：Codex 中的显示名称与默认调用语句
- `scripts/compose-diptych.mjs`：无变形拼接原图与水彩画面的确定性合成脚本
- `README.md`：效果介绍、安装与使用说明
- `LICENSE`：MIT License

---

## English Version

### What is Watercolor Collage?

**Watercolor Collage** is a Codex image-generation skill that transforms an uploaded photograph into a vertical `2:3` editorial art poster.

- The upper panel preserves the original photograph.
- The lower panel reinterprets the same moment through watercolor and handmade paper collage.
- One original English poem line is placed quietly within the negative space.

The finished image feels like a page from an independent art magazine, an old poetry book, or a personal keepsake—photographic and handmade at once.

### The Result

| Upper Panel | Lower Panel |
| --- | --- |
| Preserves the original subject, pose, setting and light | Reinterprets the subject in watercolor and torn-paper collage |
| Fills the upper panel with proportional scaling and subject-aware cropping—never stretching or squeezing | Extracts a muted natural palette from the photograph |
| Never redraws faces or changes actions | Preserves colors, direction, expression and identifying details |
| Contains no text or decoration | Adds one original English poem line in the negative space |

### Visual Language

- Vertical `2:3` split-panel composition
- Warm off-white paper with subtle fibers and grain
- Transparent watercolor layers and dry-brush texture
- Rough color shapes and torn-paper edges
- Printmaking ink, slight misregistration and missing pigment
- Small, concentrated subjects surrounded by generous negative space
- Only a few recognizable details extracted from the original setting
- No glossy digital finish, vector-cartoon outlines or sugary watercolor filters

### Best Suited For

- Everyday pet photographs and memorial keepsakes
- Quiet moments shared between people and animals
- Travel, garden, picnic, seaside and nature photography
- Personal posters, phone wallpapers and poetic art pages

### What It Preserves

Watercolor Collage is not a filter. It creates a second visual interpretation without losing the details that make the original moment personal.

It protects:

- The number and identity of every person and animal
- Pose, direction and relative position
- Coat colors, clothing, expressions and key accessories
- The photographic character of the upper panel
- The original aspect ratio through deterministic, non-generative compositing
- Edge-to-edge fill is the default, with a subject-aware crop that keeps people, animals, limbs, tails and key accessories as complete as possible
- Spacious negative space in the illustrated panel
- One correctly rendered original poem line—and no extra text

### Installation

Ask Codex to install the Skill directly:

```text
Please install the Skill from this GitHub repository:
https://github.com/cheersophiesu-cyber/watercolor-collage
```

Or download the repository and place the folder at:

```text
~/.codex/skills/watercolor-collage
```

### Usage

Upload a photograph and ask:

```text
Use $watercolor-collage to turn this photo into a watercolor collage diptych.
```

You can also guide the poem:

```text
Use $watercolor-collage and write the poem about the moment they looked back at me.
```

## License

MIT
