# 存档kimi草稿1

来自kimi的问答：

第一轮：有哪些专门的数据分析知识的网站？

第二轮：我不要视频，只要文本的的数据分析知识

[https://www.kimi.com/share/d2cakn6c8f24l0tmqkng](https://www.kimi.com/share/d2cakn6c8f24l0tmqkng "https://www.kimi.com/share/d2cakn6c8f24l0tmqkng")

下面给你一份“纯文本版”数据分析知识地图： &#x20;
— 零废话、零视频、零广告 — &#x20;
按“概念 → 方法 → 工具 → 案例 → 进阶阅读”五级展开，可直接复制到本地，随查随用。

──────────────── &#x20;

1. 概念速查表 &#x20;

1.1 指标体系 &#x20;

• 绝对指标：PV、UV、GMV、订单数、DAU、MAU &#x20;

• 相对指标：转化漏斗（曝光→点击→下单→支付→复购）、留存率、LTV、ROI、CAC、流失率、ARPU、ARPPU、客单价 &#x20;

1.2 维度体系 &#x20;

• 用户维度：性别、年龄、地域、注册渠道、会员等级、设备 OS &#x20;

• 行为维度：时间粒度（分钟/日/周/月）、功能模块、事件类型 &#x20;

• 商品维度：品类、SKU、价格带、库存状态、促销标签 &#x20;

1.3 核心模型 &#x20;

AARRR、RFM、LTV 预测、漏斗、同期群 Cohort、帕累托 80/20、ABC 分类、KANO、A/B Test、贝叶斯概率、马尔可夫链

──────────────── &#x20;

1. 方法清单 &#x20;

2.1 描述性统计 &#x20;

均值、中位数、众数、标准差、变异系数、分位数、箱线图、Z-Score &#x20;

2.2 推断统计 &#x20;

t 检验、卡方检验、ANOVA、Mann-Whitney U、KS 检验 &#x20;

2.3 预测模型 &#x20;

线性回归、逻辑回归、决策树、随机森林、XGBoost、LightGBM、ARIMA、Prophet &#x20;

2.4 无监督 &#x20;

K-Means、DBSCAN、层次聚类、PCA、t-SNE、关联规则（Apriori / FP-Growth） &#x20;

2.5 因果推断 &#x20;

双重差分 DID、断点回归 RDD、工具变量 IV、倾向得分匹配 PSM &#x20;

2.6 时间序列 &#x20;

平稳性检验 (ADF)、差分、ACF/PACF、季节性分解、STL、GARCH &#x20;

2.7 实验设计 &#x20;

假设设定 → 样本量计算 (Power Analysis) → 随机分流 → 显著性 α、功效 1-β → 结果解读 &#x20;

2.8 可视化原则 &#x20;

5 秒法则：图要在 5 秒内传递一个结论；颜色 ≤ 5 种；零基线；避免 3D；标题即结论

──────────────── &#x20;

1. 工具 & 代码片段 &#x20;

3.1 Python 速用 &#x20;

# 数据概览 &#x20;

import pandas as pd, numpy as np, seaborn as sns, matplotlib.pyplot as plt &#x20;

df = pd.read\_csv('data.csv') &#x20;

[df.info](http://df.info "df.info")(); df.describe(include='all') &#x20;

# 缺失值 &#x20;

missing = df.isna().mean().sort\_values(ascending=False) &#x20;

# 快速可视化 &#x20;

sns.pairplot(df.select\_dtypes('number').sample(1000)) &#x20;

# 逻辑回归 &#x20;

from sklearn.linear\_model import LogisticRegression &#x20;

model = LogisticRegression(max\_iter=1000).fit(X\_train, y\_train) &#x20;

# XGBoost &#x20;

import xgboost as xgb &#x20;

model = xgb.XGBClassifier(objective='binary:logistic', eval\_metric='auc') &#x20;

3.2 SQL 高频模板 &#x20;
\-- 日活 &#x20;
SELECT dt, COUNT(DISTINCT user\_id) AS dau &#x20;
FROM login\_log GROUP BY dt; &#x20;

\-- 7 日留存 &#x20;

WITH first\_day AS ( &#x20;

SELECT user\_id, MIN(dt) AS first\_dt FROM login\_log GROUP BY user\_id &#x20;

) &#x20;

SELECT a.first\_dt, COUNT(DISTINCT a.user\_id) AS new\_user, &#x20;

COUNT(DISTINCT CASE WHEN l.dt = a.first\_dt+6 THEN l.user\_id END) / COUNT(DISTINCT a.user\_id) AS d7\_retention &#x20;

FROM first\_day a &#x20;

JOIN login\_log l ON a.user\_id = l.user\_id &#x20;

GROUP BY a.first\_dt; &#x20;

\-- 窗口函数：每用户最近 30 天订单金额 &#x20;
SELECT user\_id, SUM(amount) OVER (PARTITION BY user\_id ORDER BY dt RANGE BETWEEN INTERVAL 29 DAY PRECEDING AND CURRENT ROW) AS amt\_30d &#x20;
FROM orders; &#x20;

3.3 Excel 必会
• 数据透视表：行标签、列标签、值（求和/计数）、切片器
• Power Query：合并查询、逆透视、M 语言
• Power Pivot：DAX 公式，建立数据模型
• 条件格式：色阶、数据条、公式规则 =AND($B2>100,$C2<5%) &#x20;

3.4 BI 工具 &#x20;
Tableau：LOD 表达式 {FIXED \[Region]: SUM(\[Sales])}、参数动作、集(Set) &#x20;
Power BI：DAX SUMX、EARLIER、时间智能函数 SAMEPERIODLASTYEAR &#x20;
Superset / Metabase：开源、SQL Lab、拖拽仪表盘

──────────────── &#x20;

1. 完整案例（文本版） &#x20;

背景：电商 App 最近 GMV 下滑，需定位原因。 &#x20;

步骤： &#x20;

1\) 指标拆解：GMV = UV × 转化率 × 客单价 &#x20;

2\) 取数：过去 90 天每日 UV、订单数、支付金额 &#x20;

3\) 描述：发现 GMV 从第 60 天开始下降，UV 持平，转化率由 4% 降到 3%，客单价不变 &#x20;

4\) 维度下钻： &#x20;

• 渠道维度：发现投放渠道 B 转化率从 6% 降到 2% &#x20;

• 商品维度：发现高毛利的 3C 品类曝光占比下降 &#x20;

• 用户维度：新客转化率正常，老客转化率下降 &#x20;

5\) 假设验证： &#x20;

• 渠道 B 投放素材更换 → 与运营沟通，回滚素材后转化率恢复 &#x20;

• 3C 品类库存不足 → 补货后 GMV 回升 &#x20;

6\) 输出结论：GMV 下降主因是渠道 B 素材迭代失败 + 3C 缺货，已修复，预期 7 天内恢复。

──────────────── &#x20;

1. 进阶阅读（文字链接可直粘浏览器） &#x20;

• 《An Introduction to Statistical Learning》（ISLR）  PDF 免费官方下载 &#x20;

• 《Practical Statistics for Data Scientists》  O’Reilly 出版，概念+Python 代码 &#x20;

• 《SQL for Data Analysis》  Mode Analytics 教程（全文本） &#x20;

• 《Designing Data-Intensive Applications》  系统视角讲数据管道、批流一体 &#x20;

• 《Causal Inference: The Mixtape》  Scott Cunningham 在线电子书 &#x20;

• 《Python Data Science Handbook》  Jake VanderPlas 的 Jupyter 笔记转 PDF &#x20;

• 《The Elements of Statistical Learning》（ESL）  理论进阶 &#x20;

• 官方文档：[pandas.pydata.org](http://pandas.pydata.org "pandas.pydata.org")、[scikit-learn.org](http://scikit-learn.org "scikit-learn.org")、[docs.xgboost.ai](http://docs.xgboost.ai "docs.xgboost.ai")、[tableau.com/help](http://tableau.com/help "tableau.com/help") &#x20;

──────────────── &#x20;

1. 速用备忘录（复制到 txt 做桌面便签） &#x20;

• 拿到数据先看 info()/describe() → 缺失值、分布、异常 → 再画图 &#x20;

• 任何模型前先分 train/test；回归看 RMSE & R²，分类看 ROC-AUC & F1 &#x20;

• A/B Test 至少跑满一个业务周期（7 天/30 天）再下结论 &#x20;

• 维度过多 → 先聚类/降维，再解释 &#x20;

• 汇报时结论先行：一句话 + 一张图 + 一个数字 &#x20;

──────────────── &#x20;
至此，你已拥有一套可离线使用的纯文本数据分析知识库。
