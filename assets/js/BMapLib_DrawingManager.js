
<!-- saved from url=(0099)http://api.map.baidu.com/library/DrawingManager/1.4/docs/symbols/src/BMapLib_DrawingManager.js.html -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <style>
	.KEYW {color: #933;}
	.COMM {color: #bbb; font-style: italic;}
	.NUMB {color: #393;}
	.STRN {color: #393;}
	.REGX {color: #339;}
	.line {border-right: 1px dotted #666; color: #666; font-style: normal;}
	</style></head><body><pre><span class="line">  1</span> <span class="COMM">/**
<span class="line">  2</span>  * @fileoverview 百度地图的鼠标绘制工具，对外开放。
<span class="line">  3</span>  * 允许用户在地图上点击完成鼠标绘制的功能。
<span class="line">  4</span>  * 使用者可以自定义所绘制结果的相关样式，例如线宽、颜色、测线段距离、面积等等。
<span class="line">  5</span>  * 主入口类是&lt;a href="symbols/BMapLib.DrawingManager.html"&gt;DrawingManager&lt;/a&gt;，
<span class="line">  6</span>  * 基于Baidu Map API 1.4。
<span class="line">  7</span>  *
<span class="line">  8</span>  * @author Baidu Map Api Group 
<span class="line">  9</span>  * @version 1.4
<span class="line"> 10</span>  */</span><span class="WHIT">
<span class="line"> 11</span> 
<span class="line"> 12</span> </span><span class="COMM">/** 
<span class="line"> 13</span>  * @namespace BMap的所有library类均放在BMapLib命名空间下
<span class="line"> 14</span>  */</span><span class="WHIT">
<span class="line"> 15</span> </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">BMapLib</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">window.BMapLib</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">BMapLib</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line"> 16</span> 
<span class="line"> 17</span> </span><span class="COMM">/**
<span class="line"> 18</span>  * 定义常量, 绘制的模式
<span class="line"> 19</span>  * @final {Number} DrawingType
<span class="line"> 20</span>  */</span><span class="WHIT">
<span class="line"> 21</span> </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">BMAP_DRAWING_MARKER</span><span class="WHIT">    </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="STRN">"marker"</span><span class="PUNC">,</span><span class="WHIT">     </span><span class="COMM">// 鼠标画点模式</span><span class="WHIT">
<span class="line"> 22</span> </span><span class="WHIT">    </span><span class="NAME">BMAP_DRAWING_POLYLINE</span><span class="WHIT">  </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="STRN">"polyline"</span><span class="PUNC">,</span><span class="WHIT">   </span><span class="COMM">// 鼠标画线模式</span><span class="WHIT">
<span class="line"> 23</span> </span><span class="WHIT">    </span><span class="NAME">BMAP_DRAWING_CIRCLE</span><span class="WHIT">    </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="STRN">"circle"</span><span class="PUNC">,</span><span class="WHIT">     </span><span class="COMM">// 鼠标画圆模式</span><span class="WHIT">
<span class="line"> 24</span> </span><span class="WHIT">    </span><span class="NAME">BMAP_DRAWING_RECTANGLE</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="STRN">"rectangle"</span><span class="PUNC">,</span><span class="WHIT">  </span><span class="COMM">// 鼠标画矩形模式</span><span class="WHIT">
<span class="line"> 25</span> </span><span class="WHIT">    </span><span class="NAME">BMAP_DRAWING_POLYGON</span><span class="WHIT">   </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="STRN">"polygon"</span><span class="PUNC">;</span><span class="WHIT">    </span><span class="COMM">// 鼠标画多边形模式</span><span class="WHIT">
<span class="line"> 26</span> 
<span class="line"> 27</span> </span><span class="PUNC">(</span><span class="KEYW">function</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line"> 28</span> 
<span class="line"> 29</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line"> 30</span>      * 声明baidu包
<span class="line"> 31</span>      */</span><span class="WHIT">
<span class="line"> 32</span> </span><span class="WHIT">    </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">baidu</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="NAME">guid</span><span class="WHIT"> </span><span class="PUNC">:</span><span class="WHIT"> </span><span class="STRN">"$BAIDU$"</span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line"> 33</span> </span><span class="WHIT">    </span><span class="PUNC">(</span><span class="KEYW">function</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line"> 34</span> </span><span class="WHIT">        </span><span class="COMM">// 一些页面级别唯一的属性，需要挂载在window[baidu.guid]上</span><span class="WHIT">
<span class="line"> 35</span> </span><span class="WHIT">        </span><span class="NAME">window</span><span class="PUNC">[</span><span class="NAME">baidu.guid</span><span class="PUNC">]</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line"> 36</span> 
<span class="line"> 37</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line"> 38</span>          * 将源对象的所有属性拷贝到目标对象中
<span class="line"> 39</span>          * @name baidu.extend
<span class="line"> 40</span>          * @function
<span class="line"> 41</span>          * @grammar baidu.extend(target, source)
<span class="line"> 42</span>          * @param {Object} target 目标对象
<span class="line"> 43</span>          * @param {Object} source 源对象
<span class="line"> 44</span>          * @returns {Object} 目标对象
<span class="line"> 45</span>          */</span><span class="WHIT">
<span class="line"> 46</span> </span><span class="WHIT">        </span><span class="NAME">baidu.extend</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">target</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">source</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line"> 47</span> </span><span class="WHIT">            </span><span class="KEYW">for</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">p</span><span class="WHIT"> </span><span class="KEYW">in</span><span class="WHIT"> </span><span class="NAME">source</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line"> 48</span> </span><span class="WHIT">                </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">source.hasOwnProperty</span><span class="PUNC">(</span><span class="NAME">p</span><span class="PUNC">)</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line"> 49</span> </span><span class="WHIT">                    </span><span class="NAME">target</span><span class="PUNC">[</span><span class="NAME">p</span><span class="PUNC">]</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">source</span><span class="PUNC">[</span><span class="NAME">p</span><span class="PUNC">]</span><span class="PUNC">;</span><span class="WHIT">
<span class="line"> 50</span> </span><span class="WHIT">                </span><span class="PUNC">}</span><span class="WHIT">
<span class="line"> 51</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">    
<span class="line"> 52</span>             </span><span class="KEYW">return</span><span class="WHIT"> </span><span class="NAME">target</span><span class="PUNC">;</span><span class="WHIT">
<span class="line"> 53</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line"> 54</span> 
<span class="line"> 55</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line"> 56</span>          * @ignore
<span class="line"> 57</span>          * @namespace
<span class="line"> 58</span>          * @baidu.lang 对语言层面的封装，包括类型判断、模块扩展、继承基类以及对象自定义事件的支持。
<span class="line"> 59</span>          * @property guid 对象的唯一标识
<span class="line"> 60</span>          */</span><span class="WHIT">
<span class="line"> 61</span> </span><span class="WHIT">        </span><span class="NAME">baidu.lang</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu.lang</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line"> 62</span> 
<span class="line"> 63</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line"> 64</span>          * 返回一个当前页面的唯一标识字符串。
<span class="line"> 65</span>          * @function
<span class="line"> 66</span>          * @grammar baidu.lang.guid()
<span class="line"> 67</span>          * @returns {String} 当前页面的唯一标识字符串
<span class="line"> 68</span>          */</span><span class="WHIT">
<span class="line"> 69</span> </span><span class="WHIT">        </span><span class="NAME">baidu.lang.guid</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line"> 70</span> </span><span class="WHIT">            </span><span class="KEYW">return</span><span class="WHIT"> </span><span class="STRN">"TANGRAM__"</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">window</span><span class="PUNC">[</span><span class="NAME">baidu.guid</span><span class="PUNC">]</span><span class="PUNC">.</span><span class="NAME">_counter</span><span class="WHIT"> </span><span class="PUNC">++</span><span class="PUNC">)</span><span class="PUNC">.</span><span class="NAME">toString</span><span class="PUNC">(</span><span class="NUMB">36</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line"> 71</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line"> 72</span> 
<span class="line"> 73</span> </span><span class="WHIT">        </span><span class="NAME">window</span><span class="PUNC">[</span><span class="NAME">baidu.guid</span><span class="PUNC">]</span><span class="PUNC">.</span><span class="NAME">_counter</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">window</span><span class="PUNC">[</span><span class="NAME">baidu.guid</span><span class="PUNC">]</span><span class="PUNC">.</span><span class="NAME">_counter</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="NUMB">1</span><span class="PUNC">;</span><span class="WHIT">
<span class="line"> 74</span> 
<span class="line"> 75</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line"> 76</span>          * 所有类的实例的容器
<span class="line"> 77</span>          * key为每个实例的guid
<span class="line"> 78</span>          */</span><span class="WHIT">
<span class="line"> 79</span> </span><span class="WHIT">        </span><span class="NAME">window</span><span class="PUNC">[</span><span class="NAME">baidu.guid</span><span class="PUNC">]</span><span class="PUNC">.</span><span class="NAME">_instances</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">window</span><span class="PUNC">[</span><span class="NAME">baidu.guid</span><span class="PUNC">]</span><span class="PUNC">.</span><span class="NAME">_instances</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line"> 80</span> 
<span class="line"> 81</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line"> 82</span>          * Tangram继承机制提供的一个基类，用户可以通过继承baidu.lang.Class来获取它的属性及方法。
<span class="line"> 83</span>          * @function
<span class="line"> 84</span>          * @name baidu.lang.Class
<span class="line"> 85</span>          * @grammar baidu.lang.Class(guid)
<span class="line"> 86</span>          * @param {string} guid	对象的唯一标识
<span class="line"> 87</span>          * @meta standard
<span class="line"> 88</span>          * @remark baidu.lang.Class和它的子类的实例均包含一个全局唯一的标识guid。
<span class="line"> 89</span>          * guid是在构造函数中生成的，因此，继承自baidu.lang.Class的类应该直接或者间接调用它的构造函数。&lt;br&gt;
<span class="line"> 90</span>          * baidu.lang.Class的构造函数中产生guid的方式可以保证guid的唯一性，及每个实例都有一个全局唯一的guid。
<span class="line"> 91</span>          */</span><span class="WHIT">
<span class="line"> 92</span> </span><span class="WHIT">        </span><span class="NAME">baidu.lang.Class</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="NAME">guid</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line"> 93</span> </span><span class="WHIT">            </span><span class="NAME">this.guid</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">guid</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="NAME">baidu.lang.guid</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line"> 94</span> </span><span class="WHIT">            </span><span class="NAME">window</span><span class="PUNC">[</span><span class="NAME">baidu.guid</span><span class="PUNC">]</span><span class="PUNC">.</span><span class="NAME">_instances</span><span class="PUNC">[</span><span class="NAME">this.guid</span><span class="PUNC">]</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">this</span><span class="PUNC">;</span><span class="WHIT">
<span class="line"> 95</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line"> 96</span> 
<span class="line"> 97</span> </span><span class="WHIT">        </span><span class="NAME">window</span><span class="PUNC">[</span><span class="NAME">baidu.guid</span><span class="PUNC">]</span><span class="PUNC">.</span><span class="NAME">_instances</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">window</span><span class="PUNC">[</span><span class="NAME">baidu.guid</span><span class="PUNC">]</span><span class="PUNC">.</span><span class="NAME">_instances</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line"> 98</span> 
<span class="line"> 99</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">100</span>          * 判断目标参数是否string类型或String对象
<span class="line">101</span>          * @name baidu.lang.isString
<span class="line">102</span>          * @function
<span class="line">103</span>          * @grammar baidu.lang.isString(source)
<span class="line">104</span>          * @param {Any} source 目标参数
<span class="line">105</span>          * @shortcut isString
<span class="line">106</span>          * @meta standard
<span class="line">107</span>          *             
<span class="line">108</span>          * @returns {boolean} 类型判断结果
<span class="line">109</span>          */</span><span class="WHIT">
<span class="line">110</span> </span><span class="WHIT">        </span><span class="NAME">baidu.lang.isString</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">source</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">111</span> </span><span class="WHIT">            </span><span class="KEYW">return</span><span class="WHIT"> </span><span class="STRN">'[object String]'</span><span class="WHIT"> </span><span class="PUNC">==</span><span class="WHIT"> </span><span class="NAME">Object.prototype.toString.call</span><span class="PUNC">(</span><span class="NAME">source</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">112</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">113</span> 
<span class="line">114</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">115</span>          * 判断目标参数是否为function或Function实例
<span class="line">116</span>          * @name baidu.lang.isFunction
<span class="line">117</span>          * @function
<span class="line">118</span>          * @grammar baidu.lang.isFunction(source)
<span class="line">119</span>          * @param {Any} source 目标参数
<span class="line">120</span>          * @returns {boolean} 类型判断结果
<span class="line">121</span>          */</span><span class="WHIT">
<span class="line">122</span> </span><span class="WHIT">        </span><span class="NAME">baidu.lang.isFunction</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">source</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">123</span> </span><span class="WHIT">            </span><span class="KEYW">return</span><span class="WHIT"> </span><span class="STRN">'[object Function]'</span><span class="WHIT"> </span><span class="PUNC">==</span><span class="WHIT"> </span><span class="NAME">Object.prototype.toString.call</span><span class="PUNC">(</span><span class="NAME">source</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">124</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">125</span> 
<span class="line">126</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">127</span>          * 重载了默认的toString方法，使得返回信息更加准确一些。
<span class="line">128</span>          * @return {string} 对象的String表示形式
<span class="line">129</span>          */</span><span class="WHIT">
<span class="line">130</span> </span><span class="WHIT">        </span><span class="NAME">baidu.lang.Class.prototype.toString</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">{</span><span class="WHIT">
<span class="line">131</span> </span><span class="WHIT">            </span><span class="KEYW">return</span><span class="WHIT"> </span><span class="STRN">"[object "</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">this._className</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="STRN">"Object"</span><span class="WHIT"> </span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="STRN">"]"</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">132</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">133</span> 
<span class="line">134</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">135</span>          * 释放对象所持有的资源，主要是自定义事件。
<span class="line">136</span>          * @name dispose
<span class="line">137</span>          * @grammar obj.dispose()
<span class="line">138</span>          */</span><span class="WHIT">
<span class="line">139</span> </span><span class="WHIT">        </span><span class="NAME">baidu.lang.Class.prototype.dispose</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">{</span><span class="WHIT">
<span class="line">140</span> </span><span class="WHIT">            </span><span class="KEYW">delete</span><span class="WHIT"> </span><span class="NAME">window</span><span class="PUNC">[</span><span class="NAME">baidu.guid</span><span class="PUNC">]</span><span class="PUNC">.</span><span class="NAME">_instances</span><span class="PUNC">[</span><span class="NAME">this.guid</span><span class="PUNC">]</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">141</span> </span><span class="WHIT">            </span><span class="KEYW">for</span><span class="PUNC">(</span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">property</span><span class="WHIT"> </span><span class="KEYW">in</span><span class="WHIT"> </span><span class="KEYW">this</span><span class="PUNC">)</span><span class="PUNC">{</span><span class="WHIT">
<span class="line">142</span> </span><span class="WHIT">                </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="PUNC">!</span><span class="NAME">baidu.lang.isFunction</span><span class="PUNC">(</span><span class="KEYW">this</span><span class="PUNC">[</span><span class="NAME">property</span><span class="PUNC">]</span><span class="PUNC">)</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">143</span> </span><span class="WHIT">                    </span><span class="KEYW">delete</span><span class="WHIT"> </span><span class="KEYW">this</span><span class="PUNC">[</span><span class="NAME">property</span><span class="PUNC">]</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">144</span> </span><span class="WHIT">                </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">145</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">146</span> </span><span class="WHIT">            </span><span class="NAME">this.disposed</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">true</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">147</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">148</span> 
<span class="line">149</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">150</span>          * 自定义的事件对象。
<span class="line">151</span>          * @function
<span class="line">152</span>          * @name baidu.lang.Event
<span class="line">153</span>          * @grammar baidu.lang.Event(type[, target])
<span class="line">154</span>          * @param {string} type	 事件类型名称。为了方便区分事件和一个普通的方法，事件类型名称必须以"on"(小写)开头。
<span class="line">155</span>          * @param {Object} [target]触发事件的对象
<span class="line">156</span>          * @meta standard
<span class="line">157</span>          * @remark 引入该模块，会自动为Class引入3个事件扩展方法：addEventListener、removeEventListener和dispatchEvent。
<span class="line">158</span>          * @see baidu.lang.Class
<span class="line">159</span>          */</span><span class="WHIT">
<span class="line">160</span> </span><span class="WHIT">        </span><span class="NAME">baidu.lang.Event</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">type</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">target</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">161</span> </span><span class="WHIT">            </span><span class="NAME">this.type</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">type</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">162</span> </span><span class="WHIT">            </span><span class="NAME">this.returnValue</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">true</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">163</span> </span><span class="WHIT">            </span><span class="NAME">this.target</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">target</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="KEYW">null</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">164</span> </span><span class="WHIT">            </span><span class="NAME">this.currentTarget</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">null</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">165</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">166</span> 
<span class="line">167</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">168</span>          * 注册对象的事件监听器。引入baidu.lang.Event后，Class的子类实例才会获得该方法。
<span class="line">169</span>          * @grammar obj.addEventListener(type, handler[, key])
<span class="line">170</span>          * @param 	{string}   type         自定义事件的名称
<span class="line">171</span>          * @param 	{Function} handler      自定义事件被触发时应该调用的回调函数
<span class="line">172</span>          * @param 	{string}   [key]		为事件监听函数指定的名称，可在移除时使用。如果不提供，方法会默认为它生成一个全局唯一的key。
<span class="line">173</span>          * @remark 	事件类型区分大小写。如果自定义事件名称不是以小写"on"开头，该方法会给它加上"on"再进行判断，即"click"和"onclick"会被认为是同一种事件。 
<span class="line">174</span>          */</span><span class="WHIT">
<span class="line">175</span> </span><span class="WHIT">        </span><span class="NAME">baidu.lang.Class.prototype.addEventListener</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">type</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">handler</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">key</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">176</span> </span><span class="WHIT">            </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="PUNC">!</span><span class="NAME">baidu.lang.isFunction</span><span class="PUNC">(</span><span class="NAME">handler</span><span class="PUNC">)</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">177</span> </span><span class="WHIT">                </span><span class="KEYW">return</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">178</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">179</span> </span><span class="WHIT">            </span><span class="PUNC">!</span><span class="NAME">this.__listeners</span><span class="WHIT"> </span><span class="PUNC">&amp;&amp;</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">this.__listeners</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="PUNC">}</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">180</span> </span><span class="WHIT">            </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">t</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">this.__listeners</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">id</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">181</span> </span><span class="WHIT">            </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="KEYW">typeof</span><span class="WHIT"> </span><span class="NAME">key</span><span class="WHIT"> </span><span class="PUNC">==</span><span class="WHIT"> </span><span class="STRN">"string"</span><span class="WHIT"> </span><span class="PUNC">&amp;&amp;</span><span class="WHIT"> </span><span class="NAME">key</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">182</span> </span><span class="WHIT">                </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="REGX">/[^\w\-]/</span><span class="PUNC">.</span><span class="NAME">test</span><span class="PUNC">(</span><span class="NAME">key</span><span class="PUNC">)</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">183</span> </span><span class="WHIT">                    </span><span class="KEYW">throw</span><span class="PUNC">(</span><span class="STRN">"nonstandard key:"</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="NAME">key</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">184</span> </span><span class="WHIT">                </span><span class="PUNC">}</span><span class="WHIT"> </span><span class="KEYW">else</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">185</span> </span><span class="WHIT">                    </span><span class="NAME">handler.hashCode</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">key</span><span class="PUNC">;</span><span class="WHIT"> 
<span class="line">186</span>                     </span><span class="NAME">id</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">key</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">187</span> </span><span class="WHIT">                </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">188</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">189</span> </span><span class="WHIT">            </span><span class="NAME">type.indexOf</span><span class="PUNC">(</span><span class="STRN">"on"</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">!=</span><span class="WHIT"> </span><span class="NUMB">0</span><span class="WHIT"> </span><span class="PUNC">&amp;&amp;</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">type</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="STRN">"on"</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="NAME">type</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">190</span> </span><span class="WHIT">            </span><span class="KEYW">typeof</span><span class="WHIT"> </span><span class="NAME">t</span><span class="PUNC">[</span><span class="NAME">type</span><span class="PUNC">]</span><span class="WHIT"> </span><span class="PUNC">!=</span><span class="WHIT"> </span><span class="STRN">"object"</span><span class="WHIT"> </span><span class="PUNC">&amp;&amp;</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">t</span><span class="PUNC">[</span><span class="NAME">type</span><span class="PUNC">]</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="PUNC">}</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">191</span> </span><span class="WHIT">            </span><span class="NAME">id</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">id</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="NAME">baidu.lang.guid</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">192</span> </span><span class="WHIT">            </span><span class="NAME">handler.hashCode</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">id</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">193</span> </span><span class="WHIT">            </span><span class="NAME">t</span><span class="PUNC">[</span><span class="NAME">type</span><span class="PUNC">]</span><span class="PUNC">[</span><span class="NAME">id</span><span class="PUNC">]</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">handler</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">194</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">195</span> </span><span class="WHIT">         
<span class="line">196</span>         </span><span class="COMM">/**
<span class="line">197</span>          * 移除对象的事件监听器。引入baidu.lang.Event后，Class的子类实例才会获得该方法。
<span class="line">198</span>          * @grammar obj.removeEventListener(type, handler)
<span class="line">199</span>          * @param {string}   type     事件类型
<span class="line">200</span>          * @param {Function|string} handler  要移除的事件监听函数或者监听函数的key
<span class="line">201</span>          * @remark 	如果第二个参数handler没有被绑定到对应的自定义事件中，什么也不做。
<span class="line">202</span>          */</span><span class="WHIT">
<span class="line">203</span> </span><span class="WHIT">        </span><span class="NAME">baidu.lang.Class.prototype.removeEventListener</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">type</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">handler</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">204</span> </span><span class="WHIT">            </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">baidu.lang.isFunction</span><span class="PUNC">(</span><span class="NAME">handler</span><span class="PUNC">)</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">205</span> </span><span class="WHIT">                </span><span class="NAME">handler</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">handler.hashCode</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">206</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT"> </span><span class="KEYW">else</span><span class="WHIT"> </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="PUNC">!</span><span class="NAME">baidu.lang.isString</span><span class="PUNC">(</span><span class="NAME">handler</span><span class="PUNC">)</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">207</span> </span><span class="WHIT">                </span><span class="KEYW">return</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">208</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">209</span> </span><span class="WHIT">            </span><span class="PUNC">!</span><span class="NAME">this.__listeners</span><span class="WHIT"> </span><span class="PUNC">&amp;&amp;</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">this.__listeners</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="PUNC">}</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">210</span> </span><span class="WHIT">            </span><span class="NAME">type.indexOf</span><span class="PUNC">(</span><span class="STRN">"on"</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">!=</span><span class="WHIT"> </span><span class="NUMB">0</span><span class="WHIT"> </span><span class="PUNC">&amp;&amp;</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">type</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="STRN">"on"</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="NAME">type</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">211</span> </span><span class="WHIT">            </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">t</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">this.__listeners</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">212</span> </span><span class="WHIT">            </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="PUNC">!</span><span class="NAME">t</span><span class="PUNC">[</span><span class="NAME">type</span><span class="PUNC">]</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">213</span> </span><span class="WHIT">                </span><span class="KEYW">return</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">214</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">215</span> </span><span class="WHIT">            </span><span class="NAME">t</span><span class="PUNC">[</span><span class="NAME">type</span><span class="PUNC">]</span><span class="PUNC">[</span><span class="NAME">handler</span><span class="PUNC">]</span><span class="WHIT"> </span><span class="PUNC">&amp;&amp;</span><span class="WHIT"> </span><span class="KEYW">delete</span><span class="WHIT"> </span><span class="NAME">t</span><span class="PUNC">[</span><span class="NAME">type</span><span class="PUNC">]</span><span class="PUNC">[</span><span class="NAME">handler</span><span class="PUNC">]</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">216</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">217</span> 
<span class="line">218</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">219</span>          * 派发自定义事件，使得绑定到自定义事件上面的函数都会被执行。引入baidu.lang.Event后，Class的子类实例才会获得该方法。
<span class="line">220</span>          * @grammar obj.dispatchEvent(event, options)
<span class="line">221</span>          * @param {baidu.lang.Event|String} event 	Event对象，或事件名称(1.1.1起支持)
<span class="line">222</span>          * @param {Object} options 扩展参数,所含属性键值会扩展到Event对象上(1.2起支持)
<span class="line">223</span>          * @remark 处理会调用通过addEventListenr绑定的自定义事件回调函数之外，还会调用直接绑定到对象上面的自定义事件。
<span class="line">224</span>          * 例如：&lt;br&gt;
<span class="line">225</span>          * myobj.onMyEvent = function(){}&lt;br&gt;
<span class="line">226</span>          * myobj.addEventListener("onMyEvent", function(){});
<span class="line">227</span>          */</span><span class="WHIT">
<span class="line">228</span> </span><span class="WHIT">        </span><span class="NAME">baidu.lang.Class.prototype.dispatchEvent</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">event</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">options</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">229</span> </span><span class="WHIT">            </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">baidu.lang.isString</span><span class="PUNC">(</span><span class="NAME">event</span><span class="PUNC">)</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">230</span> </span><span class="WHIT">                </span><span class="NAME">event</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">new</span><span class="WHIT"> </span><span class="NAME">baidu.lang.Event</span><span class="PUNC">(</span><span class="NAME">event</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">231</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">232</span> </span><span class="WHIT">            </span><span class="PUNC">!</span><span class="NAME">this.__listeners</span><span class="WHIT"> </span><span class="PUNC">&amp;&amp;</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">this.__listeners</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="PUNC">}</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">233</span> </span><span class="WHIT">            </span><span class="NAME">options</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">options</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">234</span> </span><span class="WHIT">            </span><span class="KEYW">for</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">i</span><span class="WHIT"> </span><span class="KEYW">in</span><span class="WHIT"> </span><span class="NAME">options</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">235</span> </span><span class="WHIT">                </span><span class="NAME">event</span><span class="PUNC">[</span><span class="NAME">i</span><span class="PUNC">]</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">options</span><span class="PUNC">[</span><span class="NAME">i</span><span class="PUNC">]</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">236</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">237</span> </span><span class="WHIT">            </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">i</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">t</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">this.__listeners</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">p</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">event.type</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">238</span> </span><span class="WHIT">            </span><span class="NAME">event.target</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">event.target</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="KEYW">this</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">239</span> </span><span class="WHIT">            </span><span class="NAME">event.currentTarget</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">this</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">240</span> </span><span class="WHIT">            </span><span class="NAME">p.indexOf</span><span class="PUNC">(</span><span class="STRN">"on"</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">!=</span><span class="WHIT"> </span><span class="NUMB">0</span><span class="WHIT"> </span><span class="PUNC">&amp;&amp;</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">p</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="STRN">"on"</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="NAME">p</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">241</span> </span><span class="WHIT">            </span><span class="NAME">baidu.lang.isFunction</span><span class="PUNC">(</span><span class="KEYW">this</span><span class="PUNC">[</span><span class="NAME">p</span><span class="PUNC">]</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">&amp;&amp;</span><span class="WHIT"> </span><span class="KEYW">this</span><span class="PUNC">[</span><span class="NAME">p</span><span class="PUNC">]</span><span class="PUNC">.</span><span class="NAME">apply</span><span class="PUNC">(</span><span class="KEYW">this</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">arguments</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">242</span> </span><span class="WHIT">            </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="KEYW">typeof</span><span class="WHIT"> </span><span class="NAME">t</span><span class="PUNC">[</span><span class="NAME">p</span><span class="PUNC">]</span><span class="WHIT"> </span><span class="PUNC">==</span><span class="WHIT"> </span><span class="STRN">"object"</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">243</span> </span><span class="WHIT">                </span><span class="KEYW">for</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">i</span><span class="WHIT"> </span><span class="KEYW">in</span><span class="WHIT"> </span><span class="NAME">t</span><span class="PUNC">[</span><span class="NAME">p</span><span class="PUNC">]</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">244</span> </span><span class="WHIT">                    </span><span class="NAME">t</span><span class="PUNC">[</span><span class="NAME">p</span><span class="PUNC">]</span><span class="PUNC">[</span><span class="NAME">i</span><span class="PUNC">]</span><span class="PUNC">.</span><span class="NAME">apply</span><span class="PUNC">(</span><span class="KEYW">this</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">arguments</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">245</span> </span><span class="WHIT">                </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">246</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">247</span> </span><span class="WHIT">            </span><span class="KEYW">return</span><span class="WHIT"> </span><span class="NAME">event.returnValue</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">248</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">249</span> 
<span class="line">250</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">251</span>          * 为类型构造器建立继承关系
<span class="line">252</span>          * @name baidu.lang.inherits
<span class="line">253</span>          * @function
<span class="line">254</span>          * @grammar baidu.lang.inherits(subClass, superClass[, className])
<span class="line">255</span>          * @param {Function} subClass 子类构造器
<span class="line">256</span>          * @param {Function} superClass 父类构造器
<span class="line">257</span>          * @param {string} className 类名标识
<span class="line">258</span>          * @remark 使subClass继承superClass的prototype，
<span class="line">259</span>          * 因此subClass的实例能够使用superClass的prototype中定义的所有属性和方法。&lt;br&gt;
<span class="line">260</span>          * 这个函数实际上是建立了subClass和superClass的原型链集成，并对subClass进行了constructor修正。&lt;br&gt;
<span class="line">261</span>          * &lt;strong&gt;注意：如果要继承构造函数，需要在subClass里面call一下，具体见下面的demo例子&lt;/strong&gt;
<span class="line">262</span>          * @shortcut inherits
<span class="line">263</span>          * @meta standard
<span class="line">264</span>          * @see baidu.lang.Class
<span class="line">265</span>          */</span><span class="WHIT">
<span class="line">266</span> </span><span class="WHIT">        </span><span class="NAME">baidu.lang.inherits</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">subClass</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">superClass</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">className</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">267</span> </span><span class="WHIT">            </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">key</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">proto</span><span class="PUNC">,</span><span class="WHIT"> 
<span class="line">268</span>                 </span><span class="NAME">selfProps</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">subClass.prototype</span><span class="PUNC">,</span><span class="WHIT"> 
<span class="line">269</span>                 </span><span class="NAME">clazz</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">new</span><span class="WHIT"> </span><span class="NAME">Function</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">        
<span class="line">270</span>             </span><span class="NAME">clazz.prototype</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">superClass.prototype</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">271</span> </span><span class="WHIT">            </span><span class="NAME">proto</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">subClass.prototype</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">new</span><span class="WHIT"> </span><span class="NAME">clazz</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">272</span> </span><span class="WHIT">            </span><span class="KEYW">for</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">key</span><span class="WHIT"> </span><span class="KEYW">in</span><span class="WHIT"> </span><span class="NAME">selfProps</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">273</span> </span><span class="WHIT">                </span><span class="NAME">proto</span><span class="PUNC">[</span><span class="NAME">key</span><span class="PUNC">]</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">selfProps</span><span class="PUNC">[</span><span class="NAME">key</span><span class="PUNC">]</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">274</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">275</span> </span><span class="WHIT">            </span><span class="NAME">subClass.prototype.constructor</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">subClass</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">276</span> </span><span class="WHIT">            </span><span class="NAME">subClass.superClass</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">superClass.prototype</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">277</span> 
<span class="line">278</span> </span><span class="WHIT">            </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="STRN">"string"</span><span class="WHIT"> </span><span class="PUNC">==</span><span class="WHIT"> </span><span class="KEYW">typeof</span><span class="WHIT"> </span><span class="NAME">className</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">279</span> </span><span class="WHIT">                </span><span class="NAME">proto._className</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">className</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">280</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">281</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">282</span> 
<span class="line">283</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">284</span>          * @ignore
<span class="line">285</span>          * @namespace baidu.dom 操作dom的方法。
<span class="line">286</span>          */</span><span class="WHIT">
<span class="line">287</span> </span><span class="WHIT">        </span><span class="NAME">baidu.dom</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu.dom</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">288</span> 
<span class="line">289</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">290</span>          * 从文档中获取指定的DOM元素
<span class="line">291</span>          * 
<span class="line">292</span>          * @param {string|HTMLElement} id 元素的id或DOM元素
<span class="line">293</span>          * @meta standard
<span class="line">294</span>          * @return {HTMLElement} DOM元素，如果不存在，返回null，如果参数不合法，直接返回参数
<span class="line">295</span>          */</span><span class="WHIT">
<span class="line">296</span> </span><span class="WHIT">        </span><span class="NAME">baidu._g</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu.dom._g</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">id</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">297</span> </span><span class="WHIT">            </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">baidu.lang.isString</span><span class="PUNC">(</span><span class="NAME">id</span><span class="PUNC">)</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">298</span> </span><span class="WHIT">                </span><span class="KEYW">return</span><span class="WHIT"> </span><span class="NAME">document.getElementById</span><span class="PUNC">(</span><span class="NAME">id</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">299</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">300</span> </span><span class="WHIT">            </span><span class="KEYW">return</span><span class="WHIT"> </span><span class="NAME">id</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">301</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">302</span> 
<span class="line">303</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">304</span>          * 从文档中获取指定的DOM元素
<span class="line">305</span>          * @name baidu.dom.g
<span class="line">306</span>          * @function
<span class="line">307</span>          * @grammar baidu.dom.g(id)
<span class="line">308</span>          * @param {string|HTMLElement} id 元素的id或DOM元素
<span class="line">309</span>          * @meta standard
<span class="line">310</span>          *             
<span class="line">311</span>          * @returns {HTMLElement|null} 获取的元素，查找不到时返回null,如果参数不合法，直接返回参数
<span class="line">312</span>          */</span><span class="WHIT">
<span class="line">313</span> </span><span class="WHIT">        </span><span class="NAME">baidu.g</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu.dom.g</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">id</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">314</span> </span><span class="WHIT">            </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="STRN">'string'</span><span class="WHIT"> </span><span class="PUNC">==</span><span class="WHIT"> </span><span class="KEYW">typeof</span><span class="WHIT"> </span><span class="NAME">id</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="NAME">id</span><span class="WHIT"> </span><span class="KEYW">instanceof</span><span class="WHIT"> </span><span class="NAME">String</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">315</span> </span><span class="WHIT">                </span><span class="KEYW">return</span><span class="WHIT"> </span><span class="NAME">document.getElementById</span><span class="PUNC">(</span><span class="NAME">id</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">316</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT"> </span><span class="KEYW">else</span><span class="WHIT"> </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">id</span><span class="WHIT"> </span><span class="PUNC">&amp;&amp;</span><span class="WHIT"> </span><span class="NAME">id.nodeName</span><span class="WHIT"> </span><span class="PUNC">&amp;&amp;</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">id.nodeType</span><span class="WHIT"> </span><span class="PUNC">==</span><span class="WHIT"> </span><span class="NUMB">1</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="NAME">id.nodeType</span><span class="WHIT"> </span><span class="PUNC">==</span><span class="WHIT"> </span><span class="NUMB">9</span><span class="PUNC">)</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">317</span> </span><span class="WHIT">                </span><span class="KEYW">return</span><span class="WHIT"> </span><span class="NAME">id</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">318</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">319</span> </span><span class="WHIT">            </span><span class="KEYW">return</span><span class="WHIT"> </span><span class="KEYW">null</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">320</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">321</span> 
<span class="line">322</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">323</span>          * 在目标元素的指定位置插入HTML代码
<span class="line">324</span>          * @name baidu.dom.insertHTML
<span class="line">325</span>          * @function
<span class="line">326</span>          * @grammar baidu.dom.insertHTML(element, position, html)
<span class="line">327</span>          * @param {HTMLElement|string} element 目标元素或目标元素的id
<span class="line">328</span>          * @param {string} position 插入html的位置信息，取值为beforeBegin,afterBegin,beforeEnd,afterEnd
<span class="line">329</span>          * @param {string} html 要插入的html
<span class="line">330</span>          * @remark
<span class="line">331</span>          * 
<span class="line">332</span>          * 对于position参数，大小写不敏感&lt;br&gt;
<span class="line">333</span>          * 参数的意思：beforeBegin&lt;span&gt;afterBegin   this is span! beforeEnd&lt;/span&gt; afterEnd &lt;br /&gt;
<span class="line">334</span>          * 此外，如果使用本函数插入带有script标签的HTML字符串，script标签对应的脚本将不会被执行。
<span class="line">335</span>          * 
<span class="line">336</span>          * @shortcut insertHTML
<span class="line">337</span>          * @meta standard
<span class="line">338</span>          *             
<span class="line">339</span>          * @returns {HTMLElement} 目标元素
<span class="line">340</span>          */</span><span class="WHIT">
<span class="line">341</span> </span><span class="WHIT">        </span><span class="NAME">baidu.insertHTML</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu.dom.insertHTML</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">element</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">position</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">html</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">342</span> </span><span class="WHIT">            </span><span class="NAME">element</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu.dom.g</span><span class="PUNC">(</span><span class="NAME">element</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">343</span> </span><span class="WHIT">            </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">range</span><span class="PUNC">,</span><span class="NAME">begin</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">344</span> 
<span class="line">345</span> </span><span class="WHIT">            </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">element.insertAdjacentHTML</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">346</span> </span><span class="WHIT">                </span><span class="NAME">element.insertAdjacentHTML</span><span class="PUNC">(</span><span class="NAME">position</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">html</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">347</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT"> </span><span class="KEYW">else</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">348</span> </span><span class="WHIT">                </span><span class="COMM">// 这里不做"undefined" != typeof(HTMLElement) &amp;&amp; !window.opera判断，其它浏览器将出错？！</span><span class="WHIT">
<span class="line">349</span> </span><span class="WHIT">                </span><span class="COMM">// 但是其实做了判断，其它浏览器下等于这个函数就不能执行了</span><span class="WHIT">
<span class="line">350</span> </span><span class="WHIT">                </span><span class="NAME">range</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">element.ownerDocument.createRange</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">351</span> </span><span class="WHIT">                </span><span class="COMM">// FF下range的位置设置错误可能导致创建出来的fragment在插入dom树之后html结构乱掉</span><span class="WHIT">
<span class="line">352</span> </span><span class="WHIT">                </span><span class="COMM">// 改用range.insertNode来插入html, by wenyuxiang @ 2010-12-14.</span><span class="WHIT">
<span class="line">353</span> </span><span class="WHIT">                </span><span class="NAME">position</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">position.toUpperCase</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">354</span> </span><span class="WHIT">                </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">position</span><span class="WHIT"> </span><span class="PUNC">==</span><span class="WHIT"> </span><span class="STRN">'AFTERBEGIN'</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="NAME">position</span><span class="WHIT"> </span><span class="PUNC">==</span><span class="WHIT"> </span><span class="STRN">'BEFOREEND'</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">355</span> </span><span class="WHIT">                    </span><span class="NAME">range.selectNodeContents</span><span class="PUNC">(</span><span class="NAME">element</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">356</span> </span><span class="WHIT">                    </span><span class="NAME">range.collapse</span><span class="PUNC">(</span><span class="NAME">position</span><span class="WHIT"> </span><span class="PUNC">==</span><span class="WHIT"> </span><span class="STRN">'AFTERBEGIN'</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">357</span> </span><span class="WHIT">                </span><span class="PUNC">}</span><span class="WHIT"> </span><span class="KEYW">else</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">358</span> </span><span class="WHIT">                    </span><span class="NAME">begin</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">position</span><span class="WHIT"> </span><span class="PUNC">==</span><span class="WHIT"> </span><span class="STRN">'BEFOREBEGIN'</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">359</span> </span><span class="WHIT">                    </span><span class="NAME">range</span><span class="PUNC">[</span><span class="NAME">begin</span><span class="WHIT"> </span><span class="PUNC">?</span><span class="WHIT"> </span><span class="STRN">'setStartBefore'</span><span class="WHIT"> </span><span class="PUNC">:</span><span class="WHIT"> </span><span class="STRN">'setEndAfter'</span><span class="PUNC">]</span><span class="PUNC">(</span><span class="NAME">element</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">360</span> </span><span class="WHIT">                    </span><span class="NAME">range.collapse</span><span class="PUNC">(</span><span class="NAME">begin</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">361</span> </span><span class="WHIT">                </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">362</span> </span><span class="WHIT">                </span><span class="NAME">range.insertNode</span><span class="PUNC">(</span><span class="NAME">range.createContextualFragment</span><span class="PUNC">(</span><span class="NAME">html</span><span class="PUNC">)</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">363</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">364</span> </span><span class="WHIT">            </span><span class="KEYW">return</span><span class="WHIT"> </span><span class="NAME">element</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">365</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">366</span> 
<span class="line">367</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">368</span>          * 为目标元素添加className
<span class="line">369</span>          * @name baidu.dom.addClass
<span class="line">370</span>          * @function
<span class="line">371</span>          * @grammar baidu.dom.addClass(element, className)
<span class="line">372</span>          * @param {HTMLElement|string} element 目标元素或目标元素的id
<span class="line">373</span>          * @param {string} className 要添加的className，允许同时添加多个class，中间使用空白符分隔
<span class="line">374</span>          * @remark
<span class="line">375</span>          * 使用者应保证提供的className合法性，不应包含不合法字符，className合法字符参考：http://www.w3.org/TR/CSS2/syndata.html。
<span class="line">376</span>          * @shortcut addClass
<span class="line">377</span>          * @meta standard
<span class="line">378</span>          * 	            
<span class="line">379</span>          * @returns {HTMLElement} 目标元素
<span class="line">380</span>          */</span><span class="WHIT">
<span class="line">381</span> </span><span class="WHIT">        </span><span class="NAME">baidu.ac</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu.dom.addClass</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">element</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">className</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">382</span> </span><span class="WHIT">            </span><span class="NAME">element</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu.dom.g</span><span class="PUNC">(</span><span class="NAME">element</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">383</span> </span><span class="WHIT">            </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">classArray</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">className.split</span><span class="PUNC">(</span><span class="REGX">/\s+/</span><span class="PUNC">)</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">384</span> </span><span class="WHIT">                </span><span class="NAME">result</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">element.className</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">385</span> </span><span class="WHIT">                </span><span class="NAME">classMatch</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="STRN">" "</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="NAME">result</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="STRN">" "</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">386</span> </span><span class="WHIT">                </span><span class="NAME">i</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NUMB">0</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">387</span> </span><span class="WHIT">                </span><span class="NAME">l</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">classArray.length</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">388</span> 
<span class="line">389</span> </span><span class="WHIT">            </span><span class="KEYW">for</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="PUNC">;</span><span class="WHIT"> </span><span class="NAME">i</span><span class="WHIT"> </span><span class="PUNC">&lt;</span><span class="WHIT"> </span><span class="NAME">l</span><span class="PUNC">;</span><span class="WHIT"> </span><span class="NAME">i</span><span class="PUNC">++</span><span class="PUNC">)</span><span class="PUNC">{</span><span class="WHIT">
<span class="line">390</span> </span><span class="WHIT">                 </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="WHIT"> </span><span class="NAME">classMatch.indexOf</span><span class="PUNC">(</span><span class="WHIT"> </span><span class="STRN">" "</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="NAME">classArray</span><span class="PUNC">[</span><span class="NAME">i</span><span class="PUNC">]</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="STRN">" "</span><span class="WHIT"> </span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">&lt;</span><span class="WHIT"> </span><span class="NUMB">0</span><span class="WHIT"> </span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">391</span> </span><span class="WHIT">                     </span><span class="NAME">result</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="PUNC">=</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">result</span><span class="WHIT"> </span><span class="PUNC">?</span><span class="WHIT"> </span><span class="STRN">' '</span><span class="WHIT"> </span><span class="PUNC">:</span><span class="WHIT"> </span><span class="STRN">''</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="NAME">classArray</span><span class="PUNC">[</span><span class="NAME">i</span><span class="PUNC">]</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">392</span> </span><span class="WHIT">                 </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">393</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">394</span> 
<span class="line">395</span> </span><span class="WHIT">            </span><span class="NAME">element.className</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">result</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">396</span> </span><span class="WHIT">            </span><span class="KEYW">return</span><span class="WHIT"> </span><span class="NAME">element</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">397</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">398</span> 
<span class="line">399</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">400</span>          * @ignore
<span class="line">401</span>          * @namespace baidu.event 屏蔽浏览器差异性的事件封装。
<span class="line">402</span>          * @property target 	事件的触发元素
<span class="line">403</span>          * @property pageX 		鼠标事件的鼠标x坐标
<span class="line">404</span>          * @property pageY 		鼠标事件的鼠标y坐标
<span class="line">405</span>          * @property keyCode 	键盘事件的键值
<span class="line">406</span>          */</span><span class="WHIT">
<span class="line">407</span> </span><span class="WHIT">        </span><span class="NAME">baidu.event</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu.event</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">408</span> 
<span class="line">409</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">410</span>          * 事件监听器的存储表
<span class="line">411</span>          * @private
<span class="line">412</span>          * @meta standard
<span class="line">413</span>          */</span><span class="WHIT">
<span class="line">414</span> </span><span class="WHIT">        </span><span class="NAME">baidu.event._listeners</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu.event._listeners</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="PUNC">[</span><span class="PUNC">]</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">415</span> 
<span class="line">416</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">417</span>          * 为目标元素添加事件监听器
<span class="line">418</span>          * @name baidu.event.on
<span class="line">419</span>          * @function
<span class="line">420</span>          * @grammar baidu.event.on(element, type, listener)
<span class="line">421</span>          * @param {HTMLElement|string|window} element 目标元素或目标元素id
<span class="line">422</span>          * @param {string} type 事件类型
<span class="line">423</span>          * @param {Function} listener 需要添加的监听器
<span class="line">424</span>          * @remark
<span class="line">425</span>          *  1. 不支持跨浏览器的鼠标滚轮事件监听器添加&lt;br&gt;
<span class="line">426</span>          *  2. 改方法不为监听器灌入事件对象，以防止跨iframe事件挂载的事件对象获取失败            
<span class="line">427</span>          * @shortcut on
<span class="line">428</span>          * @meta standard
<span class="line">429</span>          * @see baidu.event.un
<span class="line">430</span>          *             
<span class="line">431</span>          * @returns {HTMLElement|window} 目标元素
<span class="line">432</span>          */</span><span class="WHIT">
<span class="line">433</span> </span><span class="WHIT">        </span><span class="NAME">baidu.on</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu.event.on</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">element</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">type</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">listener</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">434</span> </span><span class="WHIT">            </span><span class="NAME">type</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">type.replace</span><span class="PUNC">(</span><span class="REGX">/^on/i</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="STRN">''</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">435</span> </span><span class="WHIT">            </span><span class="NAME">element</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu._g</span><span class="PUNC">(</span><span class="NAME">element</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">436</span> </span><span class="WHIT">            </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">realListener</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">ev</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">437</span> </span><span class="WHIT">                </span><span class="COMM">// 1. 这里不支持EventArgument,  原因是跨frame的事件挂载</span><span class="WHIT">
<span class="line">438</span> </span><span class="WHIT">                </span><span class="COMM">// 2. element是为了修正this</span><span class="WHIT">
<span class="line">439</span> </span><span class="WHIT">                </span><span class="NAME">listener.call</span><span class="PUNC">(</span><span class="NAME">element</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">ev</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">440</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">441</span> </span><span class="WHIT">            </span><span class="NAME">lis</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu.event._listeners</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">442</span> </span><span class="WHIT">            </span><span class="NAME">filter</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu.event._eventFilter</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">443</span> </span><span class="WHIT">            </span><span class="NAME">afterFilter</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">444</span> </span><span class="WHIT">            </span><span class="NAME">realType</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">type</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">445</span> </span><span class="WHIT">            </span><span class="NAME">type</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">type.toLowerCase</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">446</span> </span><span class="WHIT">            </span><span class="COMM">// filter过滤</span><span class="WHIT">
<span class="line">447</span> </span><span class="WHIT">            </span><span class="KEYW">if</span><span class="PUNC">(</span><span class="NAME">filter</span><span class="WHIT"> </span><span class="PUNC">&amp;&amp;</span><span class="WHIT"> </span><span class="NAME">filter</span><span class="PUNC">[</span><span class="NAME">type</span><span class="PUNC">]</span><span class="PUNC">)</span><span class="PUNC">{</span><span class="WHIT">
<span class="line">448</span> </span><span class="WHIT">                </span><span class="NAME">afterFilter</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">filter</span><span class="PUNC">[</span><span class="NAME">type</span><span class="PUNC">]</span><span class="PUNC">(</span><span class="NAME">element</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">type</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">realListener</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">449</span> </span><span class="WHIT">                </span><span class="NAME">realType</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">afterFilter.type</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">450</span> </span><span class="WHIT">                </span><span class="NAME">realListener</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">afterFilter.listener</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">451</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">452</span> </span><span class="WHIT">            </span><span class="COMM">// 事件监听器挂载</span><span class="WHIT">
<span class="line">453</span> </span><span class="WHIT">            </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">element.addEventListener</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">454</span> </span><span class="WHIT">                </span><span class="NAME">element.addEventListener</span><span class="PUNC">(</span><span class="NAME">realType</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">realListener</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="KEYW">false</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">455</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT"> </span><span class="KEYW">else</span><span class="WHIT"> </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">element.attachEvent</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">456</span> </span><span class="WHIT">                </span><span class="NAME">element.attachEvent</span><span class="PUNC">(</span><span class="STRN">'on'</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="NAME">realType</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">realListener</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">457</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">458</span> </span><span class="WHIT">          
<span class="line">459</span>             </span><span class="COMM">// 将监听器存储到数组中</span><span class="WHIT">
<span class="line">460</span> </span><span class="WHIT">            </span><span class="NAME">lis</span><span class="PUNC">[</span><span class="NAME">lis.length</span><span class="PUNC">]</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="PUNC">[</span><span class="NAME">element</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">type</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">listener</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">realListener</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">realType</span><span class="PUNC">]</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">461</span> </span><span class="WHIT">            </span><span class="KEYW">return</span><span class="WHIT"> </span><span class="NAME">element</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">462</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">463</span> 
<span class="line">464</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">465</span>          * 为目标元素移除事件监听器
<span class="line">466</span>          * @name baidu.event.un
<span class="line">467</span>          * @function
<span class="line">468</span>          * @grammar baidu.event.un(element, type, listener)
<span class="line">469</span>          * @param {HTMLElement|string|window} element 目标元素或目标元素id
<span class="line">470</span>          * @param {string} type 事件类型
<span class="line">471</span>          * @param {Function} listener 需要移除的监听器
<span class="line">472</span>          * @shortcut un
<span class="line">473</span>          * @meta standard
<span class="line">474</span>          *             
<span class="line">475</span>          * @returns {HTMLElement|window} 目标元素
<span class="line">476</span>          */</span><span class="WHIT">
<span class="line">477</span> </span><span class="WHIT">        </span><span class="NAME">baidu.un</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu.event.un</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">element</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">type</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">listener</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">478</span> </span><span class="WHIT">            </span><span class="NAME">element</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu._g</span><span class="PUNC">(</span><span class="NAME">element</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">479</span> </span><span class="WHIT">            </span><span class="NAME">type</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">type.replace</span><span class="PUNC">(</span><span class="REGX">/^on/i</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="STRN">''</span><span class="PUNC">)</span><span class="PUNC">.</span><span class="NAME">toLowerCase</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">480</span> </span><span class="WHIT">            
<span class="line">481</span>             </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">lis</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu.event._listeners</span><span class="PUNC">,</span><span class="WHIT"> 
<span class="line">482</span>                 </span><span class="NAME">len</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">lis.length</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">483</span> </span><span class="WHIT">                </span><span class="NAME">isRemoveAll</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="PUNC">!</span><span class="NAME">listener</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">484</span> </span><span class="WHIT">                </span><span class="NAME">item</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">485</span> </span><span class="WHIT">                </span><span class="NAME">realType</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">realListener</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">486</span> </span><span class="WHIT">            
<span class="line">487</span>             </span><span class="COMM">//如果将listener的结构改成json</span><span class="WHIT">
<span class="line">488</span> </span><span class="WHIT">            </span><span class="COMM">//可以节省掉这个循环，优化性能</span><span class="WHIT">
<span class="line">489</span> </span><span class="WHIT">            </span><span class="COMM">//但是由于un的使用频率并不高，同时在listener不多的时候</span><span class="WHIT">
<span class="line">490</span> </span><span class="WHIT">            </span><span class="COMM">//遍历数组的性能消耗不会对代码产生影响</span><span class="WHIT">
<span class="line">491</span> </span><span class="WHIT">            </span><span class="COMM">//暂不考虑此优化</span><span class="WHIT">
<span class="line">492</span> </span><span class="WHIT">            </span><span class="KEYW">while</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">len</span><span class="PUNC">--</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">493</span> </span><span class="WHIT">                </span><span class="NAME">item</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">lis</span><span class="PUNC">[</span><span class="NAME">len</span><span class="PUNC">]</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">494</span> </span><span class="WHIT">                
<span class="line">495</span>                 </span><span class="COMM">// listener存在时，移除element的所有以listener监听的type类型事件</span><span class="WHIT">
<span class="line">496</span> </span><span class="WHIT">                </span><span class="COMM">// listener不存在时，移除element的所有type类型事件</span><span class="WHIT">
<span class="line">497</span> </span><span class="WHIT">                </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">item</span><span class="PUNC">[</span><span class="NUMB">1</span><span class="PUNC">]</span><span class="WHIT"> </span><span class="PUNC">===</span><span class="WHIT"> </span><span class="NAME">type</span><span class="WHIT">
<span class="line">498</span> </span><span class="WHIT">                    </span><span class="PUNC">&amp;&amp;</span><span class="WHIT"> </span><span class="NAME">item</span><span class="PUNC">[</span><span class="NUMB">0</span><span class="PUNC">]</span><span class="WHIT"> </span><span class="PUNC">===</span><span class="WHIT"> </span><span class="NAME">element</span><span class="WHIT">
<span class="line">499</span> </span><span class="WHIT">                    </span><span class="PUNC">&amp;&amp;</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">isRemoveAll</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="NAME">item</span><span class="PUNC">[</span><span class="NUMB">2</span><span class="PUNC">]</span><span class="WHIT"> </span><span class="PUNC">===</span><span class="WHIT"> </span><span class="NAME">listener</span><span class="PUNC">)</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">500</span> </span><span class="WHIT">                    </span><span class="NAME">realType</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">item</span><span class="PUNC">[</span><span class="NUMB">4</span><span class="PUNC">]</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">501</span> </span><span class="WHIT">                    </span><span class="NAME">realListener</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">item</span><span class="PUNC">[</span><span class="NUMB">3</span><span class="PUNC">]</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">502</span> </span><span class="WHIT">                    </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">element.removeEventListener</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">503</span> </span><span class="WHIT">                        </span><span class="NAME">element.removeEventListener</span><span class="PUNC">(</span><span class="NAME">realType</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">realListener</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="KEYW">false</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">504</span> </span><span class="WHIT">                    </span><span class="PUNC">}</span><span class="WHIT"> </span><span class="KEYW">else</span><span class="WHIT"> </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">element.detachEvent</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">505</span> </span><span class="WHIT">                        </span><span class="NAME">element.detachEvent</span><span class="PUNC">(</span><span class="STRN">'on'</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="NAME">realType</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">realListener</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">506</span> </span><span class="WHIT">                    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">507</span> </span><span class="WHIT">                    </span><span class="NAME">lis.splice</span><span class="PUNC">(</span><span class="NAME">len</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NUMB">1</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">508</span> </span><span class="WHIT">                </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">509</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">            
<span class="line">510</span>             </span><span class="KEYW">return</span><span class="WHIT"> </span><span class="NAME">element</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">511</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">512</span> 
<span class="line">513</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">514</span>          * 获取event事件,解决不同浏览器兼容问题
<span class="line">515</span>          * @param {Event}
<span class="line">516</span>          * @return {Event}
<span class="line">517</span>          */</span><span class="WHIT">
<span class="line">518</span> </span><span class="WHIT">        </span><span class="NAME">baidu.getEvent</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu.event.getEvent</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">event</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">519</span> </span><span class="WHIT">            </span><span class="KEYW">return</span><span class="WHIT"> </span><span class="NAME">window.event</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="NAME">event</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">520</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">521</span> 
<span class="line">522</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">523</span>          * 获取event.target,解决不同浏览器兼容问题
<span class="line">524</span>          * @param {Event}
<span class="line">525</span>          * @return {Target}
<span class="line">526</span>          */</span><span class="WHIT">
<span class="line">527</span> </span><span class="WHIT">        </span><span class="NAME">baidu.getTarget</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu.event.getTarget</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">event</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">528</span> </span><span class="WHIT">            </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">event</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu.getEvent</span><span class="PUNC">(</span><span class="NAME">event</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">529</span> </span><span class="WHIT">            </span><span class="KEYW">return</span><span class="WHIT"> </span><span class="NAME">event.target</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="NAME">event.srcElement</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">530</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">531</span> 
<span class="line">532</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">533</span>          * 阻止事件的默认行为
<span class="line">534</span>          * @name baidu.event.preventDefault
<span class="line">535</span>          * @function
<span class="line">536</span>          * @grammar baidu.event.preventDefault(event)
<span class="line">537</span>          * @param {Event} event 事件对象
<span class="line">538</span>          * @meta standard
<span class="line">539</span>          */</span><span class="WHIT">
<span class="line">540</span> </span><span class="WHIT">        </span><span class="NAME">baidu.preventDefault</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu.event.preventDefault</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">event</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">541</span> </span><span class="WHIT">           </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">event</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu.getEvent</span><span class="PUNC">(</span><span class="NAME">event</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">542</span> </span><span class="WHIT">           </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">event.preventDefault</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">543</span> </span><span class="WHIT">               </span><span class="NAME">event.preventDefault</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">544</span> </span><span class="WHIT">           </span><span class="PUNC">}</span><span class="WHIT"> </span><span class="KEYW">else</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">545</span> </span><span class="WHIT">               </span><span class="NAME">event.returnValue</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">false</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">546</span> </span><span class="WHIT">           </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">547</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">548</span> 
<span class="line">549</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">550</span>          * 停止事件冒泡传播
<span class="line">551</span>          * @param {Event}
<span class="line">552</span>          */</span><span class="WHIT">
<span class="line">553</span> </span><span class="WHIT">        </span><span class="NAME">baidu.stopBubble</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu.event.stopBubble</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">event</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">554</span> </span><span class="WHIT">            </span><span class="NAME">event</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu.getEvent</span><span class="PUNC">(</span><span class="NAME">event</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">555</span> </span><span class="WHIT">            </span><span class="NAME">event.stopPropagation</span><span class="WHIT"> </span><span class="PUNC">?</span><span class="WHIT"> </span><span class="NAME">event.stopPropagation</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">:</span><span class="WHIT"> </span><span class="NAME">event.cancelBubble</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">true</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">556</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">557</span> 
<span class="line">558</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="PUNC">)</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">559</span> 
<span class="line">560</span> </span><span class="WHIT">    </span><span class="COMM">/** 
<span class="line">561</span>      * @exports DrawingManager as BMapLib.DrawingManager 
<span class="line">562</span>      */</span><span class="WHIT">
<span class="line">563</span> </span><span class="WHIT">    </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">DrawingManager</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT">
<span class="line">564</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">565</span>          * DrawingManager类的构造函数
<span class="line">566</span>          * @class 鼠标绘制管理类，实现鼠标绘制管理的&lt;b&gt;入口&lt;/b&gt;。
<span class="line">567</span>          * 实例化该类后，即可调用该类提供的open
<span class="line">568</span>          * 方法开启绘制模式状态。
<span class="line">569</span>          * 也可加入工具栏进行选择操作。
<span class="line">570</span>          * 
<span class="line">571</span>          * @constructor
<span class="line">572</span>          * @param {Map} map Baidu map的实例对象
<span class="line">573</span>          * @param {Json Object} opts 可选的输入参数，非必填项。可输入选项包括：&lt;br /&gt;
<span class="line">574</span>          * {"&lt;b&gt;isOpen&lt;/b&gt;" : {Boolean} 是否开启绘制模式
<span class="line">575</span>          * &lt;br /&gt;"&lt;b&gt;enableDrawingTool&lt;/b&gt;" : {Boolean} 是否添加绘制工具栏控件，默认不添加
<span class="line">576</span>          * &lt;br /&gt;"&lt;b&gt;drawingToolOptions&lt;/b&gt;" : {Json Object} 可选的输入参数，非必填项。可输入选项包括
<span class="line">577</span>          * &lt;br /&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"&lt;b&gt;anchor&lt;/b&gt;" : {ControlAnchor} 停靠位置、默认左上角
<span class="line">578</span>          * &lt;br /&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"&lt;b&gt;offset&lt;/b&gt;" : {Size} 偏移值。
<span class="line">579</span>          * &lt;br /&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"&lt;b&gt;scale&lt;/b&gt;" : {Number} 工具栏的缩放比例,默认为1
<span class="line">580</span>          * &lt;br /&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"&lt;b&gt;drawingModes&lt;/b&gt;" : {DrawingType&lt;Array&gt;} 工具栏上可以选择出现的绘制模式,将需要显示的DrawingType以数组型形式传入，如[BMAP_DRAWING_MARKER, BMAP_DRAWING_CIRCLE] 将只显示画点和画圆的选项
<span class="line">581</span>          * &lt;br /&gt;"&lt;b&gt;enableCalculate&lt;/b&gt;" : {Boolean} 绘制是否进行测距(画线时候)、测面(画圆、多边形、矩形)
<span class="line">582</span>          * &lt;br /&gt;"&lt;b&gt;markerOptions&lt;/b&gt;" : {CircleOptions} 所画的点的可选参数，参考api中的&lt;a href="http://developer.baidu.com/map/reference/index.php?title=Class:%E6%80%BB%E7%B1%BB/%E8%A6%86%E7%9B%96%E7%89%A9%E7%B1%BB"&gt;对应类&lt;/a&gt;
<span class="line">583</span>          * &lt;br /&gt;"&lt;b&gt;circleOptions&lt;/b&gt;" : {CircleOptions} 所画的圆的可选参数，参考api中的&lt;a href="http://developer.baidu.com/map/reference/index.php?title=Class:%E6%80%BB%E7%B1%BB/%E8%A6%86%E7%9B%96%E7%89%A9%E7%B1%BB"&gt;对应类&lt;/a&gt;
<span class="line">584</span>          * &lt;br /&gt;"&lt;b&gt;polylineOptions&lt;/b&gt;" : {CircleOptions} 所画的线的可选参数，参考api中的&lt;a href="http://developer.baidu.com/map/reference/index.php?title=Class:%E6%80%BB%E7%B1%BB/%E8%A6%86%E7%9B%96%E7%89%A9%E7%B1%BB"&gt;对应类&lt;/a&gt;
<span class="line">585</span>          * &lt;br /&gt;"&lt;b&gt;polygonOptions&lt;/b&gt;" : {PolygonOptions} 所画的多边形的可选参数，参考api中的&lt;a href="http://developer.baidu.com/map/reference/index.php?title=Class:%E6%80%BB%E7%B1%BB/%E8%A6%86%E7%9B%96%E7%89%A9%E7%B1%BB"&gt;对应类&lt;/a&gt;
<span class="line">586</span>          * &lt;br /&gt;"&lt;b&gt;rectangleOptions&lt;/b&gt;" : {PolygonOptions} 所画的矩形的可选参数，参考api中的&lt;a href="http://developer.baidu.com/map/reference/index.php?title=Class:%E6%80%BB%E7%B1%BB/%E8%A6%86%E7%9B%96%E7%89%A9%E7%B1%BB"&gt;对应类&lt;/a&gt;
<span class="line">587</span>          *
<span class="line">588</span>          * @example &lt;b&gt;参考示例：&lt;/b&gt;&lt;br /&gt;
<span class="line">589</span>          * var map = new BMap.Map("container");&lt;br /&gt;map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);&lt;br /&gt;
<span class="line">590</span>          * var myDrawingManagerObject = new BMapLib.DrawingManager(map, {isOpen: true, 
<span class="line">591</span>          *     drawingType: BMAP_DRAWING_MARKER, enableDrawingTool: true,
<span class="line">592</span>          *     enableCalculate: false,
<span class="line">593</span>          *     drawingToolOptions: {
<span class="line">594</span>          *         anchor: BMAP_ANCHOR_TOP_LEFT,
<span class="line">595</span>          *         offset: new BMap.Size(5, 5),
<span class="line">596</span>          *         drawingTypes : [
<span class="line">597</span>          *             BMAP_DRAWING_MARKER,
<span class="line">598</span>          *             BMAP_DRAWING_CIRCLE,
<span class="line">599</span>          *             BMAP_DRAWING_POLYLINE,
<span class="line">600</span>          *             BMAP_DRAWING_POLYGON,
<span class="line">601</span>          *             BMAP_DRAWING_RECTANGLE 
<span class="line">602</span>          *          ]
<span class="line">603</span>          *     },
<span class="line">604</span>          *     polylineOptions: {
<span class="line">605</span>          *         strokeColor: "#333"
<span class="line">606</span>          *     });
<span class="line">607</span>          */</span><span class="WHIT">
<span class="line">608</span> </span><span class="WHIT">        </span><span class="NAME">BMapLib.DrawingManager</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="NAME">map</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">opts</span><span class="PUNC">)</span><span class="PUNC">{</span><span class="WHIT">
<span class="line">609</span> </span><span class="WHIT">            </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="PUNC">!</span><span class="NAME">map</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">610</span> </span><span class="WHIT">                </span><span class="KEYW">return</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">611</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">612</span> </span><span class="WHIT">            </span><span class="NAME">instances.push</span><span class="PUNC">(</span><span class="KEYW">this</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">613</span> </span><span class="WHIT">            
<span class="line">614</span>             </span><span class="NAME">opts</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">opts</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">615</span> 
<span class="line">616</span> </span><span class="WHIT">            </span><span class="NAME">this._initialize</span><span class="PUNC">(</span><span class="NAME">map</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">opts</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">617</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">618</span> 
<span class="line">619</span> </span><span class="WHIT">    </span><span class="COMM">// 通过baidu.lang下的inherits方法，让DrawingManager继承baidu.lang.Class</span><span class="WHIT">
<span class="line">620</span> </span><span class="WHIT">    </span><span class="NAME">baidu.lang.inherits</span><span class="PUNC">(</span><span class="NAME">DrawingManager</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">baidu.lang.Class</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="STRN">"DrawingManager"</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">621</span> 
<span class="line">622</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">623</span>      * 开启地图的绘制模式
<span class="line">624</span>      *
<span class="line">625</span>      * @example &lt;b&gt;参考示例：&lt;/b&gt;&lt;br /&gt;
<span class="line">626</span>      * myDrawingManagerObject.open();
<span class="line">627</span>      */</span><span class="WHIT">
<span class="line">628</span> </span><span class="WHIT">    </span><span class="NAME">DrawingManager.prototype.open</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">629</span> </span><span class="WHIT">        </span><span class="COMM">// 判断绘制状态是否已经开启</span><span class="WHIT">
<span class="line">630</span> </span><span class="WHIT">        </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">this._isOpen</span><span class="WHIT"> </span><span class="PUNC">==</span><span class="WHIT"> </span><span class="KEYW">true</span><span class="PUNC">)</span><span class="PUNC">{</span><span class="WHIT">
<span class="line">631</span> </span><span class="WHIT">            </span><span class="KEYW">return</span><span class="WHIT"> </span><span class="KEYW">true</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">632</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">633</span> </span><span class="WHIT">        </span><span class="NAME">closeInstanceExcept</span><span class="PUNC">(</span><span class="KEYW">this</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">634</span> 
<span class="line">635</span> </span><span class="WHIT">        </span><span class="NAME">this._open</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">636</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">637</span> 
<span class="line">638</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">639</span>      * 关闭地图的绘制状态
<span class="line">640</span>      *
<span class="line">641</span>      * @example &lt;b&gt;参考示例：&lt;/b&gt;&lt;br /&gt;
<span class="line">642</span>      * myDrawingManagerObject.close();
<span class="line">643</span>      */</span><span class="WHIT">
<span class="line">644</span> </span><span class="WHIT">    </span><span class="NAME">DrawingManager.prototype.close</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">645</span> 
<span class="line">646</span> </span><span class="WHIT">        </span><span class="COMM">// 判断绘制状态是否已经开启</span><span class="WHIT">
<span class="line">647</span> </span><span class="WHIT">        </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">this._isOpen</span><span class="WHIT"> </span><span class="PUNC">==</span><span class="WHIT"> </span><span class="KEYW">false</span><span class="PUNC">)</span><span class="PUNC">{</span><span class="WHIT">
<span class="line">648</span> </span><span class="WHIT">            </span><span class="KEYW">return</span><span class="WHIT"> </span><span class="KEYW">true</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">649</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">650</span> 
<span class="line">651</span> </span><span class="WHIT">        </span><span class="NAME">this._close</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">652</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">653</span> 
<span class="line">654</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">655</span>      * 设置当前的绘制模式，参数DrawingType，为5个可选常量:
<span class="line">656</span>      * &lt;br/&gt;BMAP_DRAWING_MARKER    画点
<span class="line">657</span>      * &lt;br/&gt;BMAP_DRAWING_CIRCLE    画圆
<span class="line">658</span>      * &lt;br/&gt;BMAP_DRAWING_POLYLINE  画线
<span class="line">659</span>      * &lt;br/&gt;BMAP_DRAWING_POLYGON   画多边形
<span class="line">660</span>      * &lt;br/&gt;BMAP_DRAWING_RECTANGLE 画矩形
<span class="line">661</span>      * @param {DrawingType} DrawingType
<span class="line">662</span>      * @return {Boolean} 
<span class="line">663</span>      *
<span class="line">664</span>      * @example &lt;b&gt;参考示例：&lt;/b&gt;&lt;br /&gt;
<span class="line">665</span>      * myDrawingManagerObject.setDrawingMode(BMAP_DRAWING_POLYLINE);
<span class="line">666</span>      */</span><span class="WHIT">
<span class="line">667</span> </span><span class="WHIT">    </span><span class="NAME">DrawingManager.prototype.setDrawingMode</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="NAME">drawingType</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">668</span> </span><span class="WHIT">        </span><span class="COMM">//与当前模式不一样时候才进行重新绑定事件</span><span class="WHIT">
<span class="line">669</span> </span><span class="WHIT">        </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">this._drawingType</span><span class="WHIT"> </span><span class="PUNC">!=</span><span class="WHIT"> </span><span class="NAME">drawingType</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">670</span> </span><span class="WHIT">            </span><span class="NAME">closeInstanceExcept</span><span class="PUNC">(</span><span class="KEYW">this</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">671</span> </span><span class="WHIT">            </span><span class="NAME">this._setDrawingMode</span><span class="PUNC">(</span><span class="NAME">drawingType</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">672</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">673</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">674</span> 
<span class="line">675</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">676</span>      * 获取当前的绘制模式
<span class="line">677</span>      * @return {DrawingType} 绘制的模式
<span class="line">678</span>      *
<span class="line">679</span>      * @example &lt;b&gt;参考示例：&lt;/b&gt;&lt;br /&gt;
<span class="line">680</span>      * alert(myDrawingManagerObject.getDrawingMode());
<span class="line">681</span>      */</span><span class="WHIT">
<span class="line">682</span> </span><span class="WHIT">    </span><span class="NAME">DrawingManager.prototype.getDrawingMode</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">683</span> </span><span class="WHIT">        </span><span class="KEYW">return</span><span class="WHIT"> </span><span class="NAME">this._drawingType</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">684</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">685</span> 
<span class="line">686</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">687</span>      * 打开距离或面积计算
<span class="line">688</span>      *
<span class="line">689</span>      * @example &lt;b&gt;参考示例：&lt;/b&gt;&lt;br /&gt;
<span class="line">690</span>      * myDrawingManagerObject.enableCalculate();
<span class="line">691</span>      */</span><span class="WHIT">
<span class="line">692</span> </span><span class="WHIT">    </span><span class="NAME">DrawingManager.prototype.enableCalculate</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">693</span> </span><span class="WHIT">        </span><span class="NAME">this._enableCalculate</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">true</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">694</span> </span><span class="WHIT">        </span><span class="NAME">this._addGeoUtilsLibrary</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">695</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">696</span> 
<span class="line">697</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">698</span>      * 关闭距离或面积计算
<span class="line">699</span>      *
<span class="line">700</span>      * @example &lt;b&gt;参考示例：&lt;/b&gt;&lt;br /&gt;
<span class="line">701</span>      * myDrawingManagerObject.disableCalculate();
<span class="line">702</span>      */</span><span class="WHIT">
<span class="line">703</span> </span><span class="WHIT">    </span><span class="NAME">DrawingManager.prototype.disableCalculate</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">704</span> </span><span class="WHIT">        </span><span class="NAME">this._enableCalculate</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">false</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">705</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">706</span> 
<span class="line">707</span> </span><span class="WHIT">	</span><span class="COMM">/**
<span class="line">708</span>    	 * 鼠标绘制完成后，派发总事件的接口
<span class="line">709</span>      * @name DrawingManager#overlaycomplete
<span class="line">710</span>      * @event
<span class="line">711</span>      * @param {Event Object} e 回调函数会返回event参数，包括以下返回值：
<span class="line">712</span>      * &lt;br /&gt;{"&lt;b&gt;drawingMode&lt;/b&gt; : {DrawingType} 当前的绘制模式
<span class="line">713</span>      * &lt;br /&gt;"&lt;b&gt;overlay&lt;/b&gt;：{Marker||Polyline||Polygon||Circle} 对应的绘制模式返回对应的覆盖物
<span class="line">714</span>      * &lt;br /&gt;"&lt;b&gt;calculate&lt;/b&gt;：{Number} 需要开启计算模式才会返回这个值，当绘制线的时候返回距离、绘制多边形、圆、矩形时候返回面积，单位为米，
<span class="line">715</span>      * &lt;br /&gt;"&lt;b&gt;label&lt;/b&gt;：{Label} 计算面积时候出现在Map上的Label对象
<span class="line">716</span>      *
<span class="line">717</span>      * @example &lt;b&gt;参考示例：&lt;/b&gt;
<span class="line">718</span>      * myDrawingManagerObject.addEventListener("overlaycomplete", function(e) {
<span class="line">719</span>      *     alert(e.drawingMode);
<span class="line">720</span>      *     alert(e.overlay);
<span class="line">721</span>      *     alert(e.calculate);
<span class="line">722</span>      *     alert(e.label);
<span class="line">723</span>      * });
<span class="line">724</span>      */</span><span class="WHIT">
<span class="line">725</span> 
<span class="line">726</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">727</span>    	 * 绘制点完成后，派发的事件接口
<span class="line">728</span>      * @name DrawingManager#markercomplete
<span class="line">729</span>      * @event
<span class="line">730</span>      * @param {Marker} overlay 回调函数会返回相应的覆盖物，
<span class="line">731</span>      * &lt;br /&gt;{"&lt;b&gt;overlay&lt;/b&gt; : {Marker} 
<span class="line">732</span>      *
<span class="line">733</span>      * @example &lt;b&gt;参考示例：&lt;/b&gt;
<span class="line">734</span>      * myDrawingManagerObject.addEventListener("circlecomplete", function(e, overlay) {
<span class="line">735</span>      *     alert(overlay);
<span class="line">736</span>      * });
<span class="line">737</span>      */</span><span class="WHIT">
<span class="line">738</span> 
<span class="line">739</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">740</span>    	 * 绘制圆完成后，派发的事件接口
<span class="line">741</span>      * @name DrawingManager#circlecomplete
<span class="line">742</span>      * @event
<span class="line">743</span>      * @param {Circle} overlay 回调函数会返回相应的覆盖物，
<span class="line">744</span>      * &lt;br /&gt;{"&lt;b&gt;overlay&lt;/b&gt; : {Circle} 
<span class="line">745</span>      */</span><span class="WHIT">
<span class="line">746</span> 
<span class="line">747</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">748</span>    	 * 绘制线完成后，派发的事件接口
<span class="line">749</span>      * @name DrawingManager#polylinecomplete
<span class="line">750</span>      * @event
<span class="line">751</span>      * @param {Polyline} overlay 回调函数会返回相应的覆盖物，
<span class="line">752</span>      * &lt;br /&gt;{"&lt;b&gt;overlay&lt;/b&gt; : {Polyline} 
<span class="line">753</span>      */</span><span class="WHIT">
<span class="line">754</span> 
<span class="line">755</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">756</span>    	 * 绘制多边形完成后，派发的事件接口
<span class="line">757</span>      * @name DrawingManager#polygoncomplete
<span class="line">758</span>      * @event
<span class="line">759</span>      * @param {Polygon} overlay 回调函数会返回相应的覆盖物，
<span class="line">760</span>      * &lt;br /&gt;{"&lt;b&gt;overlay&lt;/b&gt; : {Polygon} 
<span class="line">761</span>      */</span><span class="WHIT">
<span class="line">762</span> 
<span class="line">763</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">764</span>    	 * 绘制矩形完成后，派发的事件接口
<span class="line">765</span>      * @name DrawingManager#rectanglecomplete
<span class="line">766</span>      * @event
<span class="line">767</span>      * @param {Polygon} overlay 回调函数会返回相应的覆盖物，
<span class="line">768</span>      * &lt;br /&gt;{"&lt;b&gt;overlay&lt;/b&gt; : {Polygon} 
<span class="line">769</span>      */</span><span class="WHIT">
<span class="line">770</span> 
<span class="line">771</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">772</span>      * 初始化状态
<span class="line">773</span>      * @param {Map} 地图实例
<span class="line">774</span>      * @param {Object} 参数
<span class="line">775</span>      */</span><span class="WHIT">
<span class="line">776</span> </span><span class="WHIT">    </span><span class="NAME">DrawingManager.prototype._initialize</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="NAME">map</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">opts</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">777</span> 
<span class="line">778</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">779</span>          * map对象
<span class="line">780</span>          * @private
<span class="line">781</span>          * @type {Map}
<span class="line">782</span>          */</span><span class="WHIT">
<span class="line">783</span> </span><span class="WHIT">        </span><span class="NAME">this._map</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">map</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">784</span> 
<span class="line">785</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">786</span>          * 配置对象
<span class="line">787</span>          * @private
<span class="line">788</span>          * @type {Object}
<span class="line">789</span>          */</span><span class="WHIT">
<span class="line">790</span> </span><span class="WHIT">        </span><span class="NAME">this._opts</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">opts</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">791</span> 
<span class="line">792</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">793</span>          * 当前的绘制模式, 默认是绘制点
<span class="line">794</span>          * @private
<span class="line">795</span>          * @type {DrawingType}
<span class="line">796</span>          */</span><span class="WHIT">
<span class="line">797</span> </span><span class="WHIT">        </span><span class="NAME">this._drawingType</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">opts.drawingMode</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="NAME">BMAP_DRAWING_MARKER</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">798</span> 
<span class="line">799</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">800</span>          * 是否添加添加鼠标绘制工具栏面板
<span class="line">801</span>          */</span><span class="WHIT">
<span class="line">802</span> </span><span class="WHIT">        </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">opts.enableDrawingTool</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">803</span> </span><span class="WHIT">            </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">drawingTool</span><span class="WHIT">  </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">new</span><span class="WHIT"> </span><span class="NAME">DrawingTool</span><span class="PUNC">(</span><span class="KEYW">this</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">opts.drawingToolOptions</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">804</span> </span><span class="WHIT">            </span><span class="NAME">this._drawingTool</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">drawingTool</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">805</span> </span><span class="WHIT">            </span><span class="NAME">map.addControl</span><span class="PUNC">(</span><span class="NAME">drawingTool</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">806</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">807</span> 
<span class="line">808</span> </span><span class="WHIT">        </span><span class="COMM">//是否计算绘制出的面积 </span><span class="WHIT">
<span class="line">809</span> </span><span class="WHIT">        </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">opts.enableCalculate</span><span class="WHIT"> </span><span class="PUNC">===</span><span class="WHIT"> </span><span class="KEYW">true</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">810</span> </span><span class="WHIT">            </span><span class="NAME">this.enableCalculate</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">811</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT"> </span><span class="KEYW">else</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">812</span> </span><span class="WHIT">            </span><span class="NAME">this.disableCalculate</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">813</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">814</span> 
<span class="line">815</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">816</span>          * 是否已经开启了绘制状态
<span class="line">817</span>          * @private
<span class="line">818</span>          * @type {Boolean}
<span class="line">819</span>          */</span><span class="WHIT">
<span class="line">820</span> </span><span class="WHIT">        </span><span class="NAME">this._isOpen</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="PUNC">!</span><span class="PUNC">!</span><span class="PUNC">(</span><span class="NAME">opts.isOpen</span><span class="WHIT"> </span><span class="PUNC">===</span><span class="WHIT"> </span><span class="KEYW">true</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">821</span> </span><span class="WHIT">        </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">this._isOpen</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">822</span> </span><span class="WHIT">            </span><span class="NAME">this._open</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">823</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">824</span> 
<span class="line">825</span> </span><span class="WHIT">        </span><span class="NAME">this.markerOptions</span><span class="WHIT">    </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">opts.markerOptions</span><span class="WHIT">    </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">826</span> </span><span class="WHIT">        </span><span class="NAME">this.circleOptions</span><span class="WHIT">    </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">opts.circleOptions</span><span class="WHIT">    </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">827</span> </span><span class="WHIT">        </span><span class="NAME">this.polylineOptions</span><span class="WHIT">  </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">opts.polylineOptions</span><span class="WHIT">  </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">828</span> </span><span class="WHIT">        </span><span class="NAME">this.polygonOptions</span><span class="WHIT">   </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">opts.polygonOptions</span><span class="WHIT">   </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">829</span> </span><span class="WHIT">        </span><span class="NAME">this.rectangleOptions</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">opts.rectangleOptions</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">830</span> 
<span class="line">831</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">832</span> 
<span class="line">833</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">834</span>      * 开启地图的绘制状态
<span class="line">835</span>      * @return {Boolean}，开启绘制状态成功，返回true；否则返回false。
<span class="line">836</span>      */</span><span class="WHIT">
<span class="line">837</span> </span><span class="WHIT">    </span><span class="NAME">DrawingManager.prototype._open</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">838</span> 
<span class="line">839</span> </span><span class="WHIT">        </span><span class="NAME">this._isOpen</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">true</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">840</span> 
<span class="line">841</span> </span><span class="WHIT">        </span><span class="COMM">//添加遮罩，所有鼠标操作都在这个遮罩上完成</span><span class="WHIT">
<span class="line">842</span> </span><span class="WHIT">        </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="PUNC">!</span><span class="NAME">this._mask</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">843</span> </span><span class="WHIT">            </span><span class="NAME">this._mask</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">new</span><span class="WHIT"> </span><span class="NAME">Mask</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">844</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">845</span> </span><span class="WHIT">        </span><span class="NAME">this._map.addOverlay</span><span class="PUNC">(</span><span class="NAME">this._mask</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">846</span> </span><span class="WHIT">        </span><span class="NAME">this._setDrawingMode</span><span class="PUNC">(</span><span class="NAME">this._drawingType</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">847</span> 
<span class="line">848</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">849</span> 
<span class="line">850</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">851</span>      * 设置当前的绘制模式
<span class="line">852</span>      * @param {DrawingType}
<span class="line">853</span>      */</span><span class="WHIT">
<span class="line">854</span> </span><span class="WHIT">    </span><span class="NAME">DrawingManager.prototype._setDrawingMode</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="NAME">drawingType</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">855</span> 
<span class="line">856</span> </span><span class="WHIT">        </span><span class="NAME">this._drawingType</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">drawingType</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">857</span> 
<span class="line">858</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">859</span>          * 开启编辑状态时候才重新进行事件绑定
<span class="line">860</span>          */</span><span class="WHIT">
<span class="line">861</span> </span><span class="WHIT">        </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">this._isOpen</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">862</span> </span><span class="WHIT">            </span><span class="COMM">//清空之前的自定义事件</span><span class="WHIT">
<span class="line">863</span> </span><span class="WHIT">            </span><span class="NAME">this._mask.__listeners</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">864</span> 
<span class="line">865</span> </span><span class="WHIT">            </span><span class="KEYW">switch</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">drawingType</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">866</span> </span><span class="WHIT">                </span><span class="KEYW">case</span><span class="WHIT"> </span><span class="NAME">BMAP_DRAWING_MARKER</span><span class="PUNC">:</span><span class="WHIT">
<span class="line">867</span> </span><span class="WHIT">                    </span><span class="NAME">this._bindMarker</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">868</span> </span><span class="WHIT">                    </span><span class="KEYW">break</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">869</span> </span><span class="WHIT">                </span><span class="KEYW">case</span><span class="WHIT"> </span><span class="NAME">BMAP_DRAWING_CIRCLE</span><span class="PUNC">:</span><span class="WHIT">
<span class="line">870</span> </span><span class="WHIT">                    </span><span class="NAME">this._bindCircle</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">871</span> </span><span class="WHIT">                    </span><span class="KEYW">break</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">872</span> </span><span class="WHIT">                </span><span class="KEYW">case</span><span class="WHIT"> </span><span class="NAME">BMAP_DRAWING_POLYLINE</span><span class="PUNC">:</span><span class="WHIT">
<span class="line">873</span> </span><span class="WHIT">                </span><span class="KEYW">case</span><span class="WHIT"> </span><span class="NAME">BMAP_DRAWING_POLYGON</span><span class="PUNC">:</span><span class="WHIT">
<span class="line">874</span> </span><span class="WHIT">                    </span><span class="NAME">this._bindPolylineOrPolygon</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">875</span> </span><span class="WHIT">                    </span><span class="KEYW">break</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">876</span> </span><span class="WHIT">                </span><span class="KEYW">case</span><span class="WHIT"> </span><span class="NAME">BMAP_DRAWING_RECTANGLE</span><span class="PUNC">:</span><span class="WHIT">
<span class="line">877</span> </span><span class="WHIT">                    </span><span class="NAME">this._bindRectangle</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">878</span> </span><span class="WHIT">                    </span><span class="KEYW">break</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">879</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">880</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">881</span> 
<span class="line">882</span> </span><span class="WHIT">        </span><span class="COMM">/** 
<span class="line">883</span>          * 如果添加了工具栏，则也需要改变工具栏的样式
<span class="line">884</span>          */</span><span class="WHIT">
<span class="line">885</span> </span><span class="WHIT">        </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">this._drawingTool</span><span class="WHIT"> </span><span class="PUNC">&amp;&amp;</span><span class="WHIT"> </span><span class="NAME">this._isOpen</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">886</span> </span><span class="WHIT">            </span><span class="NAME">this._drawingTool.setStyleByDrawingMode</span><span class="PUNC">(</span><span class="NAME">drawingType</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">887</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">888</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">889</span> 
<span class="line">890</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">891</span>      * 关闭地图的绘制状态
<span class="line">892</span>      * @return {Boolean}，关闭绘制状态成功，返回true；否则返回false。
<span class="line">893</span>      */</span><span class="WHIT">
<span class="line">894</span> </span><span class="WHIT">    </span><span class="NAME">DrawingManager.prototype._close</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">895</span> 
<span class="line">896</span> </span><span class="WHIT">        </span><span class="NAME">this._isOpen</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">false</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">897</span> 
<span class="line">898</span> </span><span class="WHIT">        </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">this._mask</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">899</span> </span><span class="WHIT">            </span><span class="NAME">this._map.removeOverlay</span><span class="PUNC">(</span><span class="NAME">this._mask</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">900</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">901</span> 
<span class="line">902</span> </span><span class="WHIT">        </span><span class="COMM">/** 
<span class="line">903</span>          * 如果添加了工具栏，则关闭时候将工具栏样式设置为拖拽地图
<span class="line">904</span>          */</span><span class="WHIT">
<span class="line">905</span> </span><span class="WHIT">        </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">this._drawingTool</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">906</span> </span><span class="WHIT">            </span><span class="NAME">this._drawingTool.setStyleByDrawingMode</span><span class="PUNC">(</span><span class="STRN">"hander"</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">907</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">908</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">909</span> 
<span class="line">910</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">911</span>      * 绑定鼠标画点的事件
<span class="line">912</span>      */</span><span class="WHIT">
<span class="line">913</span> </span><span class="WHIT">    </span><span class="NAME">DrawingManager.prototype._bindMarker</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">914</span> 
<span class="line">915</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">me</span><span class="WHIT">   </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">this</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">916</span> </span><span class="WHIT">            </span><span class="NAME">map</span><span class="WHIT">  </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">this._map</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">917</span> </span><span class="WHIT">            </span><span class="NAME">mask</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">this._mask</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">918</span> 
<span class="line">919</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">920</span>          * 鼠标点击的事件
<span class="line">921</span>          */</span><span class="WHIT">
<span class="line">922</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">clickAction</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">923</span> </span><span class="WHIT">            </span><span class="COMM">// 往地图上添加marker</span><span class="WHIT">
<span class="line">924</span> </span><span class="WHIT">            </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">marker</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">new</span><span class="WHIT"> </span><span class="NAME">BMap.Marker</span><span class="PUNC">(</span><span class="NAME">e.point</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">me.markerOptions</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">925</span> </span><span class="WHIT">            </span><span class="NAME">map.addOverlay</span><span class="PUNC">(</span><span class="NAME">marker</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">926</span> </span><span class="WHIT">            </span><span class="NAME">me._dispatchOverlayComplete</span><span class="PUNC">(</span><span class="NAME">marker</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">927</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">928</span> 
<span class="line">929</span> </span><span class="WHIT">        </span><span class="NAME">mask.addEventListener</span><span class="PUNC">(</span><span class="STRN">'click'</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">clickAction</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">930</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">931</span> 
<span class="line">932</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">933</span>      * 绑定鼠标画圆的事件
<span class="line">934</span>      */</span><span class="WHIT">
<span class="line">935</span> </span><span class="WHIT">    </span><span class="NAME">DrawingManager.prototype._bindCircle</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">936</span> 
<span class="line">937</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">me</span><span class="WHIT">           </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">this</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">938</span> </span><span class="WHIT">            </span><span class="NAME">map</span><span class="WHIT">          </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">this._map</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">939</span> </span><span class="WHIT">            </span><span class="NAME">mask</span><span class="WHIT">         </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">this._mask</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">940</span> </span><span class="WHIT">            </span><span class="NAME">circle</span><span class="WHIT">       </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">null</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">941</span> </span><span class="WHIT">            </span><span class="NAME">centerPoint</span><span class="WHIT">  </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">null</span><span class="PUNC">;</span><span class="WHIT"> </span><span class="COMM">//圆的中心点</span><span class="WHIT">
<span class="line">942</span> 
<span class="line">943</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">944</span>          * 开始绘制圆形
<span class="line">945</span>          */</span><span class="WHIT">
<span class="line">946</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">startAction</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">947</span> </span><span class="WHIT">            </span><span class="NAME">centerPoint</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">e.point</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">948</span> </span><span class="WHIT">            </span><span class="NAME">circle</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">new</span><span class="WHIT"> </span><span class="NAME">BMap.Circle</span><span class="PUNC">(</span><span class="NAME">centerPoint</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NUMB">0</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">me.circleOptions</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">949</span> </span><span class="WHIT">            </span><span class="NAME">map.addOverlay</span><span class="PUNC">(</span><span class="NAME">circle</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">950</span> </span><span class="WHIT">            </span><span class="NAME">mask.enableEdgeMove</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">951</span> </span><span class="WHIT">            </span><span class="NAME">mask.addEventListener</span><span class="PUNC">(</span><span class="STRN">'mousemove'</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">moveAction</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">952</span> </span><span class="WHIT">            </span><span class="NAME">baidu.on</span><span class="PUNC">(</span><span class="NAME">document</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="STRN">'mouseup'</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">endAction</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">953</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">954</span> 
<span class="line">955</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">956</span>          * 绘制圆形过程中，鼠标移动过程的事件
<span class="line">957</span>          */</span><span class="WHIT">
<span class="line">958</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">moveAction</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">959</span> </span><span class="WHIT">            </span><span class="NAME">circle.setRadius</span><span class="PUNC">(</span><span class="NAME">me._map.getDistance</span><span class="PUNC">(</span><span class="NAME">centerPoint</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">e.point</span><span class="PUNC">)</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">960</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">961</span> 
<span class="line">962</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">963</span>          * 绘制圆形结束
<span class="line">964</span>          */</span><span class="WHIT">
<span class="line">965</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">endAction</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">966</span> </span><span class="WHIT">            </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">calculate</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">me._calculate</span><span class="PUNC">(</span><span class="NAME">circle</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">e.point</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">967</span> </span><span class="WHIT">            </span><span class="NAME">me._dispatchOverlayComplete</span><span class="PUNC">(</span><span class="NAME">circle</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">calculate</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">968</span> </span><span class="WHIT">            </span><span class="NAME">centerPoint</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">null</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">969</span> </span><span class="WHIT">            </span><span class="NAME">mask.disableEdgeMove</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">970</span> </span><span class="WHIT">            </span><span class="NAME">mask.removeEventListener</span><span class="PUNC">(</span><span class="STRN">'mousemove'</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">moveAction</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">971</span> </span><span class="WHIT">            </span><span class="NAME">baidu.un</span><span class="PUNC">(</span><span class="NAME">document</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="STRN">'mouseup'</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">endAction</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">972</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">973</span> 
<span class="line">974</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">975</span>          * 鼠标点击起始点
<span class="line">976</span>          */</span><span class="WHIT">
<span class="line">977</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">mousedownAction</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">978</span> </span><span class="WHIT">            </span><span class="NAME">baidu.preventDefault</span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">979</span> </span><span class="WHIT">            </span><span class="NAME">baidu.stopBubble</span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">980</span> </span><span class="WHIT">            </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">centerPoint</span><span class="WHIT"> </span><span class="PUNC">==</span><span class="WHIT"> </span><span class="KEYW">null</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">981</span> </span><span class="WHIT">                </span><span class="NAME">startAction</span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">982</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT"> 
<span class="line">983</span>         </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">984</span> 
<span class="line">985</span> </span><span class="WHIT">        </span><span class="NAME">mask.addEventListener</span><span class="PUNC">(</span><span class="STRN">'mousedown'</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">mousedownAction</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">986</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">987</span> 
<span class="line">988</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">989</span>      * 画线和画多边形相似性比较大，公用一个方法
<span class="line">990</span>      */</span><span class="WHIT">
<span class="line">991</span> </span><span class="WHIT">    </span><span class="NAME">DrawingManager.prototype._bindPolylineOrPolygon</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">992</span> 
<span class="line">993</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">me</span><span class="WHIT">           </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">this</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">994</span> </span><span class="WHIT">            </span><span class="NAME">map</span><span class="WHIT">          </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">this._map</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">995</span> </span><span class="WHIT">            </span><span class="NAME">mask</span><span class="WHIT">         </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">this._mask</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">996</span> </span><span class="WHIT">            </span><span class="NAME">points</span><span class="WHIT">       </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="PUNC">[</span><span class="PUNC">]</span><span class="PUNC">,</span><span class="WHIT">   </span><span class="COMM">//用户绘制的点</span><span class="WHIT">
<span class="line">997</span> </span><span class="WHIT">            </span><span class="NAME">drawPoint</span><span class="WHIT">    </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">null</span><span class="PUNC">;</span><span class="WHIT"> </span><span class="COMM">//实际需要画在地图上的点</span><span class="WHIT">
<span class="line">998</span> </span><span class="WHIT">            </span><span class="NAME">overlay</span><span class="WHIT">      </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">null</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">999</span> </span><span class="WHIT">            </span><span class="NAME">isBinded</span><span class="WHIT">     </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">false</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1000</span> 
<span class="line">1001</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">1002</span>          * 鼠标点击的事件
<span class="line">1003</span>          */</span><span class="WHIT">
<span class="line">1004</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">startAction</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1005</span> </span><span class="WHIT">            </span><span class="NAME">points.push</span><span class="PUNC">(</span><span class="NAME">e.point</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1006</span> </span><span class="WHIT">            </span><span class="NAME">drawPoint</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">points.concat</span><span class="PUNC">(</span><span class="NAME">points</span><span class="PUNC">[</span><span class="NAME">points.length</span><span class="WHIT"> </span><span class="PUNC">-</span><span class="WHIT"> </span><span class="NUMB">1</span><span class="PUNC">]</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1007</span> </span><span class="WHIT">            </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">points.length</span><span class="WHIT"> </span><span class="PUNC">==</span><span class="WHIT"> </span><span class="NUMB">1</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1008</span> </span><span class="WHIT">                </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">me._drawingType</span><span class="WHIT"> </span><span class="PUNC">==</span><span class="WHIT"> </span><span class="NAME">BMAP_DRAWING_POLYLINE</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1009</span> </span><span class="WHIT">                    </span><span class="NAME">overlay</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">new</span><span class="WHIT"> </span><span class="NAME">BMap.Polyline</span><span class="PUNC">(</span><span class="NAME">drawPoint</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">me.polylineOptions</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1010</span> </span><span class="WHIT">                </span><span class="PUNC">}</span><span class="WHIT"> </span><span class="KEYW">else</span><span class="WHIT"> </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">me._drawingType</span><span class="WHIT"> </span><span class="PUNC">==</span><span class="WHIT"> </span><span class="NAME">BMAP_DRAWING_POLYGON</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1011</span> </span><span class="WHIT">                    </span><span class="NAME">overlay</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">new</span><span class="WHIT"> </span><span class="NAME">BMap.Polygon</span><span class="PUNC">(</span><span class="NAME">drawPoint</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">me.polygonOptions</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1012</span> </span><span class="WHIT">                </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1013</span> </span><span class="WHIT">                </span><span class="NAME">map.addOverlay</span><span class="PUNC">(</span><span class="NAME">overlay</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1014</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT"> </span><span class="KEYW">else</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1015</span> </span><span class="WHIT">                </span><span class="NAME">overlay.setPath</span><span class="PUNC">(</span><span class="NAME">drawPoint</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1016</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1017</span> </span><span class="WHIT">            </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="PUNC">!</span><span class="NAME">isBinded</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1018</span> </span><span class="WHIT">                </span><span class="NAME">isBinded</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">true</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1019</span> </span><span class="WHIT">                </span><span class="NAME">mask.enableEdgeMove</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1020</span> </span><span class="WHIT">                </span><span class="NAME">mask.addEventListener</span><span class="PUNC">(</span><span class="STRN">'mousemove'</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">mousemoveAction</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1021</span> </span><span class="WHIT">                </span><span class="NAME">mask.addEventListener</span><span class="PUNC">(</span><span class="STRN">'dblclick'</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">dblclickAction</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1022</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1023</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1024</span> 
<span class="line">1025</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">1026</span>          * 鼠标移动过程的事件
<span class="line">1027</span>          */</span><span class="WHIT">
<span class="line">1028</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">mousemoveAction</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1029</span> </span><span class="WHIT">            </span><span class="NAME">overlay.setPositionAt</span><span class="PUNC">(</span><span class="NAME">drawPoint.length</span><span class="WHIT"> </span><span class="PUNC">-</span><span class="WHIT"> </span><span class="NUMB">1</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">e.point</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1030</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1031</span> 
<span class="line">1032</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">1033</span>          * 鼠标双击的事件
<span class="line">1034</span>          */</span><span class="WHIT">
<span class="line">1035</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">dblclickAction</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1036</span> </span><span class="WHIT">            </span><span class="NAME">baidu.stopBubble</span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1037</span> </span><span class="WHIT">            </span><span class="NAME">isBinded</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">false</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1038</span> </span><span class="WHIT">            </span><span class="NAME">mask.disableEdgeMove</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1039</span> </span><span class="WHIT">            </span><span class="NAME">mask.removeEventListener</span><span class="PUNC">(</span><span class="STRN">'mousemove'</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">mousemoveAction</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1040</span> </span><span class="WHIT">            </span><span class="NAME">mask.removeEventListener</span><span class="PUNC">(</span><span class="STRN">'dblclick'</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">dblclickAction</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1041</span> </span><span class="WHIT">            </span><span class="NAME">overlay.setPath</span><span class="PUNC">(</span><span class="NAME">points</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1042</span> </span><span class="WHIT">            </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">calculate</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">me._calculate</span><span class="PUNC">(</span><span class="NAME">overlay</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">points.pop</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1043</span> </span><span class="WHIT">            </span><span class="NAME">me._dispatchOverlayComplete</span><span class="PUNC">(</span><span class="NAME">overlay</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">calculate</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1044</span> </span><span class="WHIT">            </span><span class="NAME">points.length</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NUMB">0</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1045</span> </span><span class="WHIT">            </span><span class="NAME">drawPoint.length</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NUMB">0</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1046</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1047</span> 
<span class="line">1048</span> </span><span class="WHIT">        </span><span class="NAME">mask.addEventListener</span><span class="PUNC">(</span><span class="STRN">'click'</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">startAction</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1049</span> 
<span class="line">1050</span> </span><span class="WHIT">        </span><span class="COMM">//双击时候不放大地图级别</span><span class="WHIT">
<span class="line">1051</span> </span><span class="WHIT">        </span><span class="NAME">mask.addEventListener</span><span class="PUNC">(</span><span class="STRN">'dblclick'</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1052</span> </span><span class="WHIT">            </span><span class="NAME">baidu.stopBubble</span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1053</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1054</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1055</span> 
<span class="line">1056</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">1057</span>      * 绑定鼠标画矩形的事件
<span class="line">1058</span>      */</span><span class="WHIT">
<span class="line">1059</span> </span><span class="WHIT">    </span><span class="NAME">DrawingManager.prototype._bindRectangle</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1060</span> 
<span class="line">1061</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">me</span><span class="WHIT">           </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">this</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1062</span> </span><span class="WHIT">            </span><span class="NAME">map</span><span class="WHIT">          </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">this._map</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1063</span> </span><span class="WHIT">            </span><span class="NAME">mask</span><span class="WHIT">         </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">this._mask</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1064</span> </span><span class="WHIT">            </span><span class="NAME">polygon</span><span class="WHIT">      </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">null</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1065</span> </span><span class="WHIT">            </span><span class="NAME">startPoint</span><span class="WHIT">   </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">null</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1066</span> 
<span class="line">1067</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">1068</span>          * 开始绘制矩形
<span class="line">1069</span>          */</span><span class="WHIT">
<span class="line">1070</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">startAction</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1071</span> </span><span class="WHIT">            </span><span class="NAME">baidu.stopBubble</span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1072</span> </span><span class="WHIT">            </span><span class="NAME">baidu.preventDefault</span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1073</span> </span><span class="WHIT">            </span><span class="NAME">startPoint</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">e.point</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1074</span> </span><span class="WHIT">            </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">endPoint</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">startPoint</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1075</span> </span><span class="WHIT">            </span><span class="NAME">polygon</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">new</span><span class="WHIT"> </span><span class="NAME">BMap.Polygon</span><span class="PUNC">(</span><span class="NAME">me._getRectanglePoint</span><span class="PUNC">(</span><span class="NAME">startPoint</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">endPoint</span><span class="PUNC">)</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">me.rectangleOptions</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1076</span> </span><span class="WHIT">            </span><span class="NAME">map.addOverlay</span><span class="PUNC">(</span><span class="NAME">polygon</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1077</span> </span><span class="WHIT">            </span><span class="NAME">mask.enableEdgeMove</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1078</span> </span><span class="WHIT">            </span><span class="NAME">mask.addEventListener</span><span class="PUNC">(</span><span class="STRN">'mousemove'</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">moveAction</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1079</span> </span><span class="WHIT">            </span><span class="NAME">baidu.on</span><span class="PUNC">(</span><span class="NAME">document</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="STRN">'mouseup'</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">endAction</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1080</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1081</span> 
<span class="line">1082</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">1083</span>          * 绘制矩形过程中，鼠标移动过程的事件
<span class="line">1084</span>          */</span><span class="WHIT">
<span class="line">1085</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">moveAction</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1086</span> </span><span class="WHIT">            </span><span class="NAME">polygon.setPath</span><span class="PUNC">(</span><span class="NAME">me._getRectanglePoint</span><span class="PUNC">(</span><span class="NAME">startPoint</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">e.point</span><span class="PUNC">)</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1087</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1088</span> 
<span class="line">1089</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">1090</span>          * 绘制矩形结束
<span class="line">1091</span>          */</span><span class="WHIT">
<span class="line">1092</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">endAction</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1093</span> </span><span class="WHIT">            </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">calculate</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">me._calculate</span><span class="PUNC">(</span><span class="NAME">polygon</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">polygon.getPath</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">[</span><span class="NUMB">2</span><span class="PUNC">]</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1094</span> </span><span class="WHIT">            </span><span class="NAME">me._dispatchOverlayComplete</span><span class="PUNC">(</span><span class="NAME">polygon</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">calculate</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1095</span> </span><span class="WHIT">            </span><span class="NAME">startPoint</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">null</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1096</span> </span><span class="WHIT">            </span><span class="NAME">mask.disableEdgeMove</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1097</span> </span><span class="WHIT">            </span><span class="NAME">mask.removeEventListener</span><span class="PUNC">(</span><span class="STRN">'mousemove'</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">moveAction</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1098</span> </span><span class="WHIT">            </span><span class="NAME">baidu.un</span><span class="PUNC">(</span><span class="NAME">document</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="STRN">'mouseup'</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">endAction</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1099</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1100</span> 
<span class="line">1101</span> </span><span class="WHIT">        </span><span class="NAME">mask.addEventListener</span><span class="PUNC">(</span><span class="STRN">'mousedown'</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">startAction</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1102</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1103</span> 
<span class="line">1104</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">1105</span>      * 添加显示所绘制图形的面积或者长度
<span class="line">1106</span>      * @param {overlay} 覆盖物
<span class="line">1107</span>      * @param {point} 显示的位置
<span class="line">1108</span>      */</span><span class="WHIT">
<span class="line">1109</span> </span><span class="WHIT">    </span><span class="NAME">DrawingManager.prototype._calculate</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">overlay</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">point</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1110</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">result</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1111</span> </span><span class="WHIT">            </span><span class="NAME">data</span><span class="WHIT">  </span><span class="PUNC">:</span><span class="WHIT"> </span><span class="NUMB">0</span><span class="PUNC">,</span><span class="WHIT">    </span><span class="COMM">//计算出来的长度或面积</span><span class="WHIT">
<span class="line">1112</span> </span><span class="WHIT">            </span><span class="NAME">label</span><span class="WHIT"> </span><span class="PUNC">:</span><span class="WHIT"> </span><span class="KEYW">null</span><span class="WHIT">  </span><span class="COMM">//显示长度或面积的label对象</span><span class="WHIT">
<span class="line">1113</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1114</span> </span><span class="WHIT">        </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">this._enableCalculate</span><span class="WHIT"> </span><span class="PUNC">&amp;&amp;</span><span class="WHIT"> </span><span class="NAME">BMapLib.GeoUtils</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1115</span> </span><span class="WHIT">            </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">type</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">overlay.toString</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1116</span> </span><span class="WHIT">            </span><span class="COMM">//不同覆盖物调用不同的计算方法</span><span class="WHIT">
<span class="line">1117</span> </span><span class="WHIT">            </span><span class="KEYW">switch</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">type</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1118</span> </span><span class="WHIT">                </span><span class="KEYW">case</span><span class="WHIT"> </span><span class="STRN">"[object Polyline]"</span><span class="PUNC">:</span><span class="WHIT">
<span class="line">1119</span> </span><span class="WHIT">                    </span><span class="NAME">result.data</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">BMapLib.GeoUtils.getPolylineDistance</span><span class="PUNC">(</span><span class="NAME">overlay</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1120</span> </span><span class="WHIT">                    </span><span class="KEYW">break</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1121</span> </span><span class="WHIT">                </span><span class="KEYW">case</span><span class="WHIT"> </span><span class="STRN">"[object Polygon]"</span><span class="PUNC">:</span><span class="WHIT">
<span class="line">1122</span> </span><span class="WHIT">                    </span><span class="NAME">result.data</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">BMapLib.GeoUtils.getPolygonArea</span><span class="PUNC">(</span><span class="NAME">overlay</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1123</span> </span><span class="WHIT">                    </span><span class="KEYW">break</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1124</span> </span><span class="WHIT">                </span><span class="KEYW">case</span><span class="WHIT"> </span><span class="STRN">"[object Circle]"</span><span class="PUNC">:</span><span class="WHIT">
<span class="line">1125</span> </span><span class="WHIT">                    </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">radius</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">overlay.getRadius</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1126</span> </span><span class="WHIT">                    </span><span class="NAME">result.data</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">Math.PI</span><span class="WHIT"> </span><span class="PUNC">*</span><span class="WHIT"> </span><span class="NAME">radius</span><span class="WHIT"> </span><span class="PUNC">*</span><span class="WHIT"> </span><span class="NAME">radius</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1127</span> </span><span class="WHIT">                    </span><span class="KEYW">break</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1128</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1129</span> </span><span class="WHIT">            </span><span class="COMM">//一场情况处理</span><span class="WHIT">
<span class="line">1130</span> </span><span class="WHIT">            </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="PUNC">!</span><span class="NAME">result.data</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="NAME">result.data</span><span class="WHIT"> </span><span class="PUNC">&lt;</span><span class="WHIT"> </span><span class="NUMB">0</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1131</span> </span><span class="WHIT">                </span><span class="NAME">result.data</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NUMB">0</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1132</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT"> </span><span class="KEYW">else</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1133</span> </span><span class="WHIT">                </span><span class="COMM">//保留2位小数位</span><span class="WHIT">
<span class="line">1134</span> </span><span class="WHIT">                </span><span class="NAME">result.data</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">result.data.toFixed</span><span class="PUNC">(</span><span class="NUMB">2</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1135</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1136</span> </span><span class="WHIT">            </span><span class="NAME">result.label</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">this._addLabel</span><span class="PUNC">(</span><span class="NAME">point</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">result.data</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1137</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1138</span> </span><span class="WHIT">        </span><span class="KEYW">return</span><span class="WHIT"> </span><span class="NAME">result</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1139</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1140</span> 
<span class="line">1141</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">1142</span>      * 开启测距和测面功能需要依赖于GeoUtils库
<span class="line">1143</span>      * 所以这里判断用户是否已经加载,若未加载则用js动态加载
<span class="line">1144</span>      */</span><span class="WHIT">
<span class="line">1145</span> </span><span class="WHIT">    </span><span class="NAME">DrawingManager.prototype._addGeoUtilsLibrary</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1146</span> </span><span class="WHIT">        </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="PUNC">!</span><span class="NAME">BMapLib.GeoUtils</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1147</span> </span><span class="WHIT">            </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">script</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">document.createElement</span><span class="PUNC">(</span><span class="STRN">'script'</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1148</span> </span><span class="WHIT">            </span><span class="NAME">script.setAttribute</span><span class="PUNC">(</span><span class="STRN">"type"</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="STRN">"text/javascript"</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1149</span> </span><span class="WHIT">            </span><span class="NAME">script.setAttribute</span><span class="PUNC">(</span><span class="STRN">"src"</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="STRN">'http://api.map.baidu.com/library/GeoUtils/1.2/src/GeoUtils_min.js'</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1150</span> </span><span class="WHIT">            </span><span class="NAME">document.body.appendChild</span><span class="PUNC">(</span><span class="NAME">script</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1151</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1152</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1153</span> 
<span class="line">1154</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">1155</span>      * 向地图中添加文本标注
<span class="line">1156</span>      * @param {Point}
<span class="line">1157</span>      * @param {String} 所以显示的内容
<span class="line">1158</span>      */</span><span class="WHIT">
<span class="line">1159</span> </span><span class="WHIT">    </span><span class="NAME">DrawingManager.prototype._addLabel</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">point</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">content</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1160</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">label</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">new</span><span class="WHIT"> </span><span class="NAME">BMap.Label</span><span class="PUNC">(</span><span class="NAME">content</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1161</span> </span><span class="WHIT">            </span><span class="NAME">position</span><span class="PUNC">:</span><span class="WHIT"> </span><span class="NAME">point</span><span class="WHIT">
<span class="line">1162</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1163</span> </span><span class="WHIT">        </span><span class="NAME">this._map.addOverlay</span><span class="PUNC">(</span><span class="NAME">label</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1164</span> </span><span class="WHIT">        </span><span class="KEYW">return</span><span class="WHIT"> </span><span class="NAME">label</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1165</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1166</span> 
<span class="line">1167</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">1168</span>      * 根据起终点获取矩形的四个顶点
<span class="line">1169</span>      * @param {Point} 起点
<span class="line">1170</span>      * @param {Point} 终点
<span class="line">1171</span>      */</span><span class="WHIT">
<span class="line">1172</span> </span><span class="WHIT">    </span><span class="NAME">DrawingManager.prototype._getRectanglePoint</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">startPoint</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">endPoint</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1173</span> </span><span class="WHIT">        </span><span class="KEYW">return</span><span class="WHIT"> </span><span class="PUNC">[</span><span class="WHIT">
<span class="line">1174</span> </span><span class="WHIT">            </span><span class="KEYW">new</span><span class="WHIT"> </span><span class="NAME">BMap.Point</span><span class="PUNC">(</span><span class="NAME">startPoint.lng</span><span class="PUNC">,</span><span class="NAME">startPoint.lat</span><span class="PUNC">)</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1175</span> </span><span class="WHIT">            </span><span class="KEYW">new</span><span class="WHIT"> </span><span class="NAME">BMap.Point</span><span class="PUNC">(</span><span class="NAME">endPoint.lng</span><span class="PUNC">,</span><span class="NAME">startPoint.lat</span><span class="PUNC">)</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1176</span> </span><span class="WHIT">            </span><span class="KEYW">new</span><span class="WHIT"> </span><span class="NAME">BMap.Point</span><span class="PUNC">(</span><span class="NAME">endPoint.lng</span><span class="PUNC">,</span><span class="NAME">endPoint.lat</span><span class="PUNC">)</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1177</span> </span><span class="WHIT">            </span><span class="KEYW">new</span><span class="WHIT"> </span><span class="NAME">BMap.Point</span><span class="PUNC">(</span><span class="NAME">startPoint.lng</span><span class="PUNC">,</span><span class="NAME">endPoint.lat</span><span class="PUNC">)</span><span class="WHIT">
<span class="line">1178</span> </span><span class="WHIT">        </span><span class="PUNC">]</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1179</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1180</span> 
<span class="line">1181</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">1182</span>      * 派发事件
<span class="line">1183</span>      */</span><span class="WHIT">
<span class="line">1184</span> </span><span class="WHIT">    </span><span class="NAME">DrawingManager.prototype._dispatchOverlayComplete</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">overlay</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">calculate</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1185</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">options</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1186</span> </span><span class="WHIT">            </span><span class="STRN">'overlay'</span><span class="WHIT">     </span><span class="PUNC">:</span><span class="WHIT"> </span><span class="NAME">overlay</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1187</span> </span><span class="WHIT">            </span><span class="STRN">'drawingMode'</span><span class="WHIT"> </span><span class="PUNC">:</span><span class="WHIT"> </span><span class="NAME">this._drawingType</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1188</span> </span><span class="WHIT">            </span><span class="STRN">'calculate'</span><span class="WHIT">   </span><span class="PUNC">:</span><span class="WHIT"> </span><span class="NAME">calculate.data</span><span class="WHIT">  </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="KEYW">null</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1189</span> </span><span class="WHIT">            </span><span class="STRN">'label'</span><span class="WHIT">       </span><span class="PUNC">:</span><span class="WHIT"> </span><span class="NAME">calculate.label</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="KEYW">null</span><span class="WHIT">
<span class="line">1190</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1191</span> </span><span class="WHIT">        </span><span class="NAME">this.dispatchEvent</span><span class="PUNC">(</span><span class="NAME">this._drawingType</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="STRN">'complete'</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">overlay</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1192</span> </span><span class="WHIT">        </span><span class="NAME">this.dispatchEvent</span><span class="PUNC">(</span><span class="STRN">'overlaycomplete'</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">options</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1193</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1194</span> 
<span class="line">1195</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">1196</span>      * 创建遮罩对象
<span class="line">1197</span>      */</span><span class="WHIT">
<span class="line">1198</span> </span><span class="WHIT">    </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="NAME">Mask</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1199</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">1200</span>          * 鼠标到地图边缘的时候是否自动平移地图
<span class="line">1201</span>          */</span><span class="WHIT">
<span class="line">1202</span> </span><span class="WHIT">        </span><span class="NAME">this._enableEdgeMove</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">false</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1203</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1204</span> 
<span class="line">1205</span> </span><span class="WHIT">    </span><span class="NAME">Mask.prototype</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">new</span><span class="WHIT"> </span><span class="NAME">BMap.Overlay</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1206</span> 
<span class="line">1207</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">1208</span>      * 这里不使用api中的自定义事件，是为了更灵活使用
<span class="line">1209</span>      */</span><span class="WHIT">
<span class="line">1210</span> </span><span class="WHIT">    </span><span class="NAME">Mask.prototype.dispatchEvent</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu.lang.Class.prototype.dispatchEvent</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1211</span> </span><span class="WHIT">    </span><span class="NAME">Mask.prototype.addEventListener</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu.lang.Class.prototype.addEventListener</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1212</span> </span><span class="WHIT">    </span><span class="NAME">Mask.prototype.removeEventListener</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu.lang.Class.prototype.removeEventListener</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1213</span> 
<span class="line">1214</span> </span><span class="WHIT">    </span><span class="NAME">Mask.prototype.initialize</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="NAME">map</span><span class="PUNC">)</span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1215</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">me</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">this</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1216</span> </span><span class="WHIT">        </span><span class="NAME">this._map</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">map</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1217</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">div</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">this.container</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">document.createElement</span><span class="PUNC">(</span><span class="STRN">"div"</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1218</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">size</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">this._map.getSize</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1219</span> </span><span class="WHIT">        </span><span class="NAME">div.style.cssText</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="STRN">"position:absolute;background:url(about:blank);cursor:crosshair;width:"</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="NAME">size.width</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="STRN">"px;height:"</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="NAME">size.height</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="STRN">"px"</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1220</span> </span><span class="WHIT">        </span><span class="NAME">this._map.addEventListener</span><span class="PUNC">(</span><span class="STRN">'resize'</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1221</span> </span><span class="WHIT">            </span><span class="NAME">me._adjustSize</span><span class="PUNC">(</span><span class="NAME">e.size</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1222</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1223</span> </span><span class="WHIT">        </span><span class="NAME">this._map.getPanes</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">.</span><span class="NAME">floatPane.appendChild</span><span class="PUNC">(</span><span class="NAME">div</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1224</span> </span><span class="WHIT">        </span><span class="NAME">this._bind</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1225</span> </span><span class="WHIT">        </span><span class="KEYW">return</span><span class="WHIT"> </span><span class="NAME">div</span><span class="PUNC">;</span><span class="WHIT"> 
<span class="line">1226</span>     </span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1227</span> 
<span class="line">1228</span> </span><span class="WHIT">    </span><span class="NAME">Mask.prototype.draw</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1229</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">map</span><span class="WHIT">   </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">this._map</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1230</span> </span><span class="WHIT">            </span><span class="NAME">point</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">map.pixelToPoint</span><span class="PUNC">(</span><span class="KEYW">new</span><span class="WHIT"> </span><span class="NAME">BMap.Pixel</span><span class="PUNC">(</span><span class="NUMB">0</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NUMB">0</span><span class="PUNC">)</span><span class="PUNC">)</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1231</span> </span><span class="WHIT">            </span><span class="NAME">pixel</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">map.pointToOverlayPixel</span><span class="PUNC">(</span><span class="NAME">point</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1232</span> </span><span class="WHIT">        </span><span class="NAME">this.container.style.left</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">pixel.x</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="STRN">"px"</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1233</span> </span><span class="WHIT">        </span><span class="NAME">this.container.style.top</span><span class="WHIT">  </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">pixel.y</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="STRN">"px"</span><span class="PUNC">;</span><span class="WHIT"> 
<span class="line">1234</span>     </span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1235</span> 
<span class="line">1236</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">1237</span>      * 开启鼠标到地图边缘，自动平移地图
<span class="line">1238</span>      */</span><span class="WHIT">
<span class="line">1239</span> </span><span class="WHIT">    </span><span class="NAME">Mask.prototype.enableEdgeMove</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1240</span> </span><span class="WHIT">        </span><span class="NAME">this._enableEdgeMove</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">true</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1241</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1242</span> 
<span class="line">1243</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">1244</span>      * 关闭鼠标到地图边缘，自动平移地图
<span class="line">1245</span>      */</span><span class="WHIT">
<span class="line">1246</span> </span><span class="WHIT">    </span><span class="NAME">Mask.prototype.disableEdgeMove</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1247</span> </span><span class="WHIT">        </span><span class="NAME">clearInterval</span><span class="PUNC">(</span><span class="NAME">this._edgeMoveTimer</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1248</span> </span><span class="WHIT">        </span><span class="NAME">this._enableEdgeMove</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">false</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1249</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1250</span> 
<span class="line">1251</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">1252</span>      * 绑定事件,派发自定义事件
<span class="line">1253</span>      */</span><span class="WHIT">
<span class="line">1254</span> </span><span class="WHIT">    </span><span class="NAME">Mask.prototype._bind</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1255</span> 
<span class="line">1256</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">me</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">this</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1257</span> </span><span class="WHIT">            </span><span class="NAME">map</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">this._map</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1258</span> </span><span class="WHIT">            </span><span class="NAME">container</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">this.container</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1259</span> </span><span class="WHIT">            </span><span class="NAME">lastMousedownXY</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">null</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1260</span> </span><span class="WHIT">            </span><span class="NAME">lastClickXY</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">null</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1261</span> 
<span class="line">1262</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">1263</span>          * 根据event对象获取鼠标的xy坐标对象
<span class="line">1264</span>          * @param {Event}
<span class="line">1265</span>          * @return {Object} {x:e.x, y:e.y}
<span class="line">1266</span>          */</span><span class="WHIT">
<span class="line">1267</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">getXYbyEvent</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1268</span> </span><span class="WHIT">            </span><span class="KEYW">return</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1269</span> </span><span class="WHIT">                </span><span class="NAME">x</span><span class="WHIT"> </span><span class="PUNC">:</span><span class="WHIT"> </span><span class="NAME">e.clientX</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1270</span> </span><span class="WHIT">                </span><span class="NAME">y</span><span class="WHIT"> </span><span class="PUNC">:</span><span class="WHIT"> </span><span class="NAME">e.clientY</span><span class="WHIT">
<span class="line">1271</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1272</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1273</span> 
<span class="line">1274</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">domEvent</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1275</span> </span><span class="WHIT">            </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">type</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">e.type</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1276</span> </span><span class="WHIT">                </span><span class="NAME">e</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu.getEvent</span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1277</span> </span><span class="WHIT">                </span><span class="NAME">point</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">me.getDrawPoint</span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT"> </span><span class="COMM">//当前鼠标所在点的地理坐标</span><span class="WHIT">
<span class="line">1278</span> 
<span class="line">1279</span> </span><span class="WHIT">            </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">dispatchEvent</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="NAME">type</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1280</span> </span><span class="WHIT">                </span><span class="NAME">e.point</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">point</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1281</span> </span><span class="WHIT">                </span><span class="NAME">me.dispatchEvent</span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1282</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1283</span> 
<span class="line">1284</span> </span><span class="WHIT">            </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">type</span><span class="WHIT"> </span><span class="PUNC">==</span><span class="WHIT"> </span><span class="STRN">"mousedown"</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1285</span> </span><span class="WHIT">                </span><span class="NAME">lastMousedownXY</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">getXYbyEvent</span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1286</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1287</span> 
<span class="line">1288</span> </span><span class="WHIT">            </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">nowXY</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">getXYbyEvent</span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1289</span> </span><span class="WHIT">            </span><span class="COMM">//click经过一些特殊处理派发，其他同事件按正常的dom事件派发</span><span class="WHIT">
<span class="line">1290</span> </span><span class="WHIT">            </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">type</span><span class="WHIT"> </span><span class="PUNC">==</span><span class="WHIT"> </span><span class="STRN">"click"</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1291</span> </span><span class="WHIT">                </span><span class="COMM">//鼠标点击过程不进行移动才派发click和dblclick</span><span class="WHIT">
<span class="line">1292</span> </span><span class="WHIT">                </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">Math.abs</span><span class="PUNC">(</span><span class="NAME">nowXY.x</span><span class="WHIT"> </span><span class="PUNC">-</span><span class="WHIT"> </span><span class="NAME">lastMousedownXY.x</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">&lt;</span><span class="WHIT"> </span><span class="NUMB">5</span><span class="WHIT"> </span><span class="PUNC">&amp;&amp;</span><span class="WHIT"> </span><span class="NAME">Math.abs</span><span class="PUNC">(</span><span class="NAME">nowXY.y</span><span class="WHIT"> </span><span class="PUNC">-</span><span class="WHIT"> </span><span class="NAME">lastMousedownXY.y</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">&lt;</span><span class="WHIT"> </span><span class="NUMB">5</span><span class="WHIT"> </span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1293</span> </span><span class="WHIT">                    </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="PUNC">!</span><span class="NAME">lastClickXY</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="PUNC">!</span><span class="PUNC">(</span><span class="NAME">Math.abs</span><span class="PUNC">(</span><span class="NAME">nowXY.x</span><span class="WHIT"> </span><span class="PUNC">-</span><span class="WHIT"> </span><span class="NAME">lastClickXY.x</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">&lt;</span><span class="WHIT"> </span><span class="NUMB">5</span><span class="WHIT"> </span><span class="PUNC">&amp;&amp;</span><span class="WHIT"> </span><span class="NAME">Math.abs</span><span class="PUNC">(</span><span class="NAME">nowXY.y</span><span class="WHIT"> </span><span class="PUNC">-</span><span class="WHIT"> </span><span class="NAME">lastClickXY.y</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">&lt;</span><span class="WHIT"> </span><span class="NUMB">5</span><span class="PUNC">)</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1294</span> </span><span class="WHIT">                        </span><span class="NAME">dispatchEvent</span><span class="PUNC">(</span><span class="STRN">'click'</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1295</span> </span><span class="WHIT">                        </span><span class="NAME">lastClickXY</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">getXYbyEvent</span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1296</span> </span><span class="WHIT">                    </span><span class="PUNC">}</span><span class="WHIT"> </span><span class="KEYW">else</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1297</span> </span><span class="WHIT">                        </span><span class="NAME">lastClickXY</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">null</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1298</span> </span><span class="WHIT">                    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1299</span> </span><span class="WHIT">                </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1300</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT"> </span><span class="KEYW">else</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1301</span> </span><span class="WHIT">                </span><span class="NAME">dispatchEvent</span><span class="PUNC">(</span><span class="NAME">type</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1302</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1303</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1304</span> 
<span class="line">1305</span> </span><span class="WHIT">        </span><span class="COMM">/**
<span class="line">1306</span>          * 将事件都遮罩层的事件都绑定到domEvent来处理
<span class="line">1307</span>          */</span><span class="WHIT">
<span class="line">1308</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">events</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="PUNC">[</span><span class="STRN">'click'</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="STRN">'mousedown'</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="STRN">'mousemove'</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="STRN">'mouseup'</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="STRN">'dblclick'</span><span class="PUNC">]</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1309</span> </span><span class="WHIT">            </span><span class="NAME">index</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">events.length</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1310</span> </span><span class="WHIT">        </span><span class="KEYW">while</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">index</span><span class="PUNC">--</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1311</span> </span><span class="WHIT">            </span><span class="NAME">baidu.on</span><span class="PUNC">(</span><span class="NAME">container</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">events</span><span class="PUNC">[</span><span class="NAME">index</span><span class="PUNC">]</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">domEvent</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1312</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1313</span> 
<span class="line">1314</span> </span><span class="WHIT">        </span><span class="COMM">//鼠标移动过程中，到地图边缘后自动平移地图</span><span class="WHIT">
<span class="line">1315</span> </span><span class="WHIT">        </span><span class="NAME">baidu.on</span><span class="PUNC">(</span><span class="NAME">container</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="STRN">'mousemove'</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1316</span> </span><span class="WHIT">            </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">me._enableEdgeMove</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1317</span> </span><span class="WHIT">                </span><span class="NAME">me.mousemoveAction</span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1318</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1319</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1320</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1321</span> 
<span class="line">1322</span> </span><span class="WHIT">    </span><span class="COMM">//鼠标移动过程中，到地图边缘后自动平移地图</span><span class="WHIT">
<span class="line">1323</span> </span><span class="WHIT">    </span><span class="NAME">Mask.prototype.mousemoveAction</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1324</span> </span><span class="WHIT">        </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="NAME">getClientPosition</span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1325</span> </span><span class="WHIT">            </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">clientX</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">e.clientX</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1326</span> </span><span class="WHIT">                </span><span class="NAME">clientY</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">e.clientY</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1327</span> </span><span class="WHIT">            </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">e.changedTouches</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1328</span> </span><span class="WHIT">                </span><span class="NAME">clientX</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">e.changedTouches</span><span class="PUNC">[</span><span class="NUMB">0</span><span class="PUNC">]</span><span class="PUNC">.</span><span class="NAME">clientX</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1329</span> </span><span class="WHIT">                </span><span class="NAME">clientY</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">e.changedTouches</span><span class="PUNC">[</span><span class="NUMB">0</span><span class="PUNC">]</span><span class="PUNC">.</span><span class="NAME">clientY</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1330</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1331</span> </span><span class="WHIT">            </span><span class="KEYW">return</span><span class="WHIT"> </span><span class="KEYW">new</span><span class="WHIT"> </span><span class="NAME">BMap.Pixel</span><span class="PUNC">(</span><span class="NAME">clientX</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">clientY</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1332</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1333</span> 
<span class="line">1334</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">map</span><span class="WHIT">       </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">this._map</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1335</span> </span><span class="WHIT">            </span><span class="NAME">me</span><span class="WHIT">        </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">this</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1336</span> </span><span class="WHIT">            </span><span class="NAME">pixel</span><span class="WHIT">     </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">map.pointToPixel</span><span class="PUNC">(</span><span class="NAME">this.getDrawPoint</span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="PUNC">)</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1337</span> </span><span class="WHIT">            </span><span class="NAME">clientPos</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">getClientPosition</span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1338</span> </span><span class="WHIT">            </span><span class="NAME">offsetX</span><span class="WHIT">   </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">clientPos.x</span><span class="WHIT"> </span><span class="PUNC">-</span><span class="WHIT"> </span><span class="NAME">pixel.x</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1339</span> </span><span class="WHIT">            </span><span class="NAME">offsetY</span><span class="WHIT">   </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">clientPos.y</span><span class="WHIT"> </span><span class="PUNC">-</span><span class="WHIT"> </span><span class="NAME">pixel.y</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1340</span> </span><span class="WHIT">        </span><span class="NAME">pixel</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">new</span><span class="WHIT"> </span><span class="NAME">BMap.Pixel</span><span class="PUNC">(</span><span class="PUNC">(</span><span class="NAME">clientPos.x</span><span class="WHIT"> </span><span class="PUNC">-</span><span class="WHIT"> </span><span class="NAME">offsetX</span><span class="PUNC">)</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">clientPos.y</span><span class="WHIT"> </span><span class="PUNC">-</span><span class="WHIT"> </span><span class="NAME">offsetY</span><span class="PUNC">)</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1341</span> </span><span class="WHIT">        </span><span class="NAME">this._draggingMovePixel</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">pixel</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1342</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">point</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">map.pixelToPoint</span><span class="PUNC">(</span><span class="NAME">pixel</span><span class="PUNC">)</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1343</span> </span><span class="WHIT">            </span><span class="NAME">eventObj</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1344</span> </span><span class="WHIT">                </span><span class="NAME">pixel</span><span class="PUNC">:</span><span class="WHIT"> </span><span class="NAME">pixel</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1345</span> </span><span class="WHIT">                </span><span class="NAME">point</span><span class="PUNC">:</span><span class="WHIT"> </span><span class="NAME">point</span><span class="WHIT">
<span class="line">1346</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1347</span> </span><span class="WHIT">        </span><span class="COMM">// 拖拽到地图边缘移动地图</span><span class="WHIT">
<span class="line">1348</span> </span><span class="WHIT">        </span><span class="NAME">this._panByX</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">this._panByY</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NUMB">0</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1349</span> </span><span class="WHIT">        </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">pixel.x</span><span class="WHIT"> </span><span class="PUNC">&lt;=</span><span class="WHIT"> </span><span class="NUMB">20</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="NAME">pixel.x</span><span class="WHIT"> </span><span class="PUNC">&gt;=</span><span class="WHIT"> </span><span class="NAME">map.width</span><span class="WHIT"> </span><span class="PUNC">-</span><span class="WHIT"> </span><span class="NUMB">20</span><span class="WHIT">
<span class="line">1350</span> </span><span class="WHIT">            </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="NAME">pixel.y</span><span class="WHIT"> </span><span class="PUNC">&lt;=</span><span class="WHIT"> </span><span class="NUMB">50</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="NAME">pixel.y</span><span class="WHIT"> </span><span class="PUNC">&gt;=</span><span class="WHIT"> </span><span class="NAME">map.height</span><span class="WHIT"> </span><span class="PUNC">-</span><span class="WHIT"> </span><span class="NUMB">10</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1351</span> </span><span class="WHIT">            </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">pixel.x</span><span class="WHIT"> </span><span class="PUNC">&lt;=</span><span class="WHIT"> </span><span class="NUMB">20</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1352</span> </span><span class="WHIT">                </span><span class="NAME">this._panByX</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NUMB">8</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1353</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT"> </span><span class="KEYW">else</span><span class="WHIT"> </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">pixel.x</span><span class="WHIT"> </span><span class="PUNC">&gt;=</span><span class="WHIT"> </span><span class="NAME">map.width</span><span class="WHIT"> </span><span class="PUNC">-</span><span class="WHIT"> </span><span class="NUMB">20</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1354</span> </span><span class="WHIT">                </span><span class="NAME">this._panByX</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="PUNC">-</span><span class="NUMB">8</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1355</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1356</span> </span><span class="WHIT">            </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">pixel.y</span><span class="WHIT"> </span><span class="PUNC">&lt;=</span><span class="WHIT"> </span><span class="NUMB">50</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1357</span> </span><span class="WHIT">                </span><span class="NAME">this._panByY</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NUMB">8</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1358</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT"> </span><span class="KEYW">else</span><span class="WHIT"> </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">pixel.y</span><span class="WHIT"> </span><span class="PUNC">&gt;=</span><span class="WHIT"> </span><span class="NAME">map.height</span><span class="WHIT"> </span><span class="PUNC">-</span><span class="WHIT"> </span><span class="NUMB">10</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1359</span> </span><span class="WHIT">                </span><span class="NAME">this._panByY</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="PUNC">-</span><span class="NUMB">8</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1360</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1361</span> </span><span class="WHIT">            </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="PUNC">!</span><span class="NAME">this._edgeMoveTimer</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1362</span> </span><span class="WHIT">                </span><span class="NAME">this._edgeMoveTimer</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">setInterval</span><span class="PUNC">(</span><span class="KEYW">function</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1363</span> </span><span class="WHIT">                    </span><span class="NAME">map.panBy</span><span class="PUNC">(</span><span class="NAME">me._panByX</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">me._panByY</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="STRN">"noAnimation"</span><span class="PUNC">:</span><span class="WHIT"> </span><span class="KEYW">true</span><span class="PUNC">}</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1364</span> </span><span class="WHIT">                </span><span class="PUNC">}</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NUMB">30</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1365</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1366</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT"> </span><span class="KEYW">else</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1367</span> </span><span class="WHIT">            </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">this._edgeMoveTimer</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1368</span> </span><span class="WHIT">                </span><span class="NAME">clearInterval</span><span class="PUNC">(</span><span class="NAME">this._edgeMoveTimer</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1369</span> </span><span class="WHIT">                </span><span class="NAME">this._edgeMoveTimer</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">null</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1370</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1371</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1372</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1373</span> 
<span class="line">1374</span> </span><span class="WHIT">    </span><span class="COMM">/*
<span class="line">1375</span>      * 调整大小
<span class="line">1376</span>      * @param {Size}
<span class="line">1377</span>      */</span><span class="WHIT">
<span class="line">1378</span> </span><span class="WHIT">    </span><span class="NAME">Mask.prototype._adjustSize</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="NAME">size</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1379</span> </span><span class="WHIT">        </span><span class="NAME">this.container.style.width</span><span class="WHIT">  </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">size.width</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="STRN">'px'</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1380</span> </span><span class="WHIT">        </span><span class="NAME">this.container.style.height</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">size.height</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="STRN">'px'</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1381</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1382</span> 
<span class="line">1383</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">1384</span>      * 获取当前绘制点的地理坐标
<span class="line">1385</span>      *
<span class="line">1386</span>      * @param {Event} e e对象
<span class="line">1387</span>      * @return Point对象的位置信息
<span class="line">1388</span>      */</span><span class="WHIT">
<span class="line">1389</span> </span><span class="WHIT">    </span><span class="NAME">Mask.prototype.getDrawPoint</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1390</span> </span><span class="WHIT">        
<span class="line">1391</span>         </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">map</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">this._map</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1392</span> </span><span class="WHIT">        </span><span class="NAME">trigger</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu.getTarget</span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1393</span> </span><span class="WHIT">        </span><span class="NAME">x</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">e.offsetX</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="NAME">e.layerX</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="NUMB">0</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1394</span> </span><span class="WHIT">        </span><span class="NAME">y</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">e.offsetY</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="NAME">e.layerY</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="NUMB">0</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1395</span> </span><span class="WHIT">        </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">trigger.nodeType</span><span class="WHIT"> </span><span class="PUNC">!=</span><span class="WHIT"> </span><span class="NUMB">1</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="NAME">trigger</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">trigger.parentNode</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1396</span> </span><span class="WHIT">        </span><span class="KEYW">while</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">trigger</span><span class="WHIT"> </span><span class="PUNC">&amp;&amp;</span><span class="WHIT"> </span><span class="NAME">trigger</span><span class="WHIT"> </span><span class="PUNC">!=</span><span class="WHIT"> </span><span class="NAME">map.getContainer</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1397</span> </span><span class="WHIT">            </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="PUNC">!</span><span class="PUNC">(</span><span class="NAME">trigger.clientWidth</span><span class="WHIT"> </span><span class="PUNC">==</span><span class="WHIT"> </span><span class="NUMB">0</span><span class="WHIT"> </span><span class="PUNC">&amp;&amp;</span><span class="WHIT">
<span class="line">1398</span> </span><span class="WHIT">                </span><span class="NAME">trigger.clientHeight</span><span class="WHIT"> </span><span class="PUNC">==</span><span class="WHIT"> </span><span class="NUMB">0</span><span class="WHIT"> </span><span class="PUNC">&amp;&amp;</span><span class="WHIT">
<span class="line">1399</span> </span><span class="WHIT">                </span><span class="NAME">trigger.offsetParent</span><span class="WHIT"> </span><span class="PUNC">&amp;&amp;</span><span class="WHIT"> </span><span class="NAME">trigger.offsetParent.nodeName</span><span class="WHIT"> </span><span class="PUNC">==</span><span class="WHIT"> </span><span class="STRN">'TD'</span><span class="PUNC">)</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1400</span> </span><span class="WHIT">                </span><span class="NAME">x</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">trigger.offsetLeft</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="NUMB">0</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1401</span> </span><span class="WHIT">                </span><span class="NAME">y</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">trigger.offsetTop</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="NUMB">0</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1402</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1403</span> </span><span class="WHIT">            </span><span class="NAME">trigger</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">trigger.offsetParent</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1404</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1405</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">pixel</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">new</span><span class="WHIT"> </span><span class="NAME">BMap.Pixel</span><span class="PUNC">(</span><span class="NAME">x</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">y</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1406</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">point</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">map.pixelToPoint</span><span class="PUNC">(</span><span class="NAME">pixel</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1407</span> </span><span class="WHIT">        </span><span class="KEYW">return</span><span class="WHIT"> </span><span class="NAME">point</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1408</span> 
<span class="line">1409</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1410</span> 
<span class="line">1411</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">1412</span>      * 绘制工具面板，自定义控件
<span class="line">1413</span>      */</span><span class="WHIT">
<span class="line">1414</span> </span><span class="WHIT">    </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="NAME">DrawingTool</span><span class="PUNC">(</span><span class="NAME">drawingManager</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">drawingToolOptions</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1415</span> </span><span class="WHIT">        </span><span class="NAME">this.drawingManager</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">drawingManager</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1416</span> 
<span class="line">1417</span> </span><span class="WHIT">        </span><span class="NAME">drawingToolOptions</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">this.drawingToolOptions</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">drawingToolOptions</span><span class="WHIT"> </span><span class="PUNC">||</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1418</span> </span><span class="WHIT">        </span><span class="COMM">// 默认停靠位置和偏移量</span><span class="WHIT">
<span class="line">1419</span> </span><span class="WHIT">        </span><span class="NAME">this.defaultAnchor</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">BMAP_ANCHOR_TOP_LEFT</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1420</span> </span><span class="WHIT">        </span><span class="NAME">this.defaultOffset</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">new</span><span class="WHIT"> </span><span class="NAME">BMap.Size</span><span class="PUNC">(</span><span class="NUMB">10</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NUMB">10</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1421</span> 
<span class="line">1422</span> </span><span class="WHIT">        </span><span class="COMM">//默认所有工具栏都显示</span><span class="WHIT">
<span class="line">1423</span> </span><span class="WHIT">        </span><span class="NAME">this.defaultDrawingModes</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="PUNC">[</span><span class="WHIT">
<span class="line">1424</span> </span><span class="WHIT">            </span><span class="NAME">BMAP_DRAWING_MARKER</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1425</span> </span><span class="WHIT">            </span><span class="NAME">BMAP_DRAWING_CIRCLE</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1426</span> </span><span class="WHIT">            </span><span class="NAME">BMAP_DRAWING_POLYLINE</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1427</span> </span><span class="WHIT">            </span><span class="NAME">BMAP_DRAWING_POLYGON</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1428</span> </span><span class="WHIT">            </span><span class="NAME">BMAP_DRAWING_RECTANGLE</span><span class="WHIT">
<span class="line">1429</span> </span><span class="WHIT">        </span><span class="PUNC">]</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1430</span> </span><span class="WHIT">        </span><span class="COMM">//工具栏可显示的绘制模式</span><span class="WHIT">
<span class="line">1431</span> </span><span class="WHIT">        </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">drawingToolOptions.drawingModes</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1432</span> </span><span class="WHIT">            </span><span class="NAME">this.drawingModes</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">drawingToolOptions.drawingModes</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1433</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT"> </span><span class="KEYW">else</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1434</span> </span><span class="WHIT">            </span><span class="NAME">this.drawingModes</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">this.defaultDrawingModes</span><span class="WHIT">
<span class="line">1435</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1436</span> 
<span class="line">1437</span> </span><span class="WHIT">        </span><span class="COMM">//用户设置停靠位置和偏移量</span><span class="WHIT">
<span class="line">1438</span> </span><span class="WHIT">        </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">drawingToolOptions.anchor</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1439</span> </span><span class="WHIT">            </span><span class="NAME">this.setAnchor</span><span class="PUNC">(</span><span class="NAME">drawingToolOptions.anchor</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1440</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1441</span> </span><span class="WHIT">        </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">drawingToolOptions.offset</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1442</span> </span><span class="WHIT">            </span><span class="NAME">this.setOffset</span><span class="PUNC">(</span><span class="NAME">drawingToolOptions.offset</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1443</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1444</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1445</span> 
<span class="line">1446</span> </span><span class="WHIT">    </span><span class="COMM">// 通过JavaScript的prototype属性继承于BMap.Control</span><span class="WHIT">
<span class="line">1447</span> </span><span class="WHIT">    </span><span class="NAME">DrawingTool.prototype</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">new</span><span class="WHIT"> </span><span class="NAME">BMap.Control</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1448</span> 
<span class="line">1449</span> </span><span class="WHIT">    </span><span class="COMM">// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回</span><span class="WHIT">
<span class="line">1450</span> </span><span class="WHIT">    </span><span class="COMM">// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中</span><span class="WHIT">
<span class="line">1451</span> </span><span class="WHIT">    </span><span class="NAME">DrawingTool.prototype.initialize</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="NAME">map</span><span class="PUNC">)</span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1452</span> </span><span class="WHIT">        </span><span class="COMM">// 创建一个DOM元素</span><span class="WHIT">
<span class="line">1453</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">container</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">this.container</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">document.createElement</span><span class="PUNC">(</span><span class="STRN">"div"</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1454</span> </span><span class="WHIT">        </span><span class="NAME">container.className</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="STRN">"BMapLib_Drawing"</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1455</span> </span><span class="WHIT">        </span><span class="COMM">//用来设置外层边框阴影</span><span class="WHIT">
<span class="line">1456</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">panel</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">this.panel</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">document.createElement</span><span class="PUNC">(</span><span class="STRN">"div"</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1457</span> </span><span class="WHIT">        </span><span class="NAME">panel.className</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="STRN">"BMapLib_Drawing_panel"</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1458</span> </span><span class="WHIT">        </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">this.drawingToolOptions</span><span class="WHIT"> </span><span class="PUNC">&amp;&amp;</span><span class="WHIT"> </span><span class="NAME">this.drawingToolOptions.scale</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1459</span> </span><span class="WHIT">            </span><span class="NAME">this._setScale</span><span class="PUNC">(</span><span class="NAME">this.drawingToolOptions.scale</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1460</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1461</span> </span><span class="WHIT">        </span><span class="NAME">container.appendChild</span><span class="PUNC">(</span><span class="NAME">panel</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1462</span> </span><span class="WHIT">        </span><span class="COMM">// 添加内容</span><span class="WHIT">
<span class="line">1463</span> </span><span class="WHIT">        </span><span class="NAME">panel.innerHTML</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">this._generalHtml</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1464</span> </span><span class="WHIT">        </span><span class="COMM">//绑定事件</span><span class="WHIT">
<span class="line">1465</span> </span><span class="WHIT">        </span><span class="NAME">this._bind</span><span class="PUNC">(</span><span class="NAME">panel</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1466</span> </span><span class="WHIT">        </span><span class="COMM">// 添加DOM元素到地图中</span><span class="WHIT">
<span class="line">1467</span> </span><span class="WHIT">        </span><span class="NAME">map.getContainer</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">.</span><span class="NAME">appendChild</span><span class="PUNC">(</span><span class="NAME">container</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1468</span> </span><span class="WHIT">        </span><span class="COMM">// 将DOM元素返回</span><span class="WHIT">
<span class="line">1469</span> </span><span class="WHIT">        </span><span class="KEYW">return</span><span class="WHIT"> </span><span class="NAME">container</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1470</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1471</span> 
<span class="line">1472</span> </span><span class="WHIT">    </span><span class="COMM">//生成工具栏的html元素</span><span class="WHIT">
<span class="line">1473</span> </span><span class="WHIT">    </span><span class="NAME">DrawingTool.prototype._generalHtml</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="NAME">map</span><span class="PUNC">)</span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1474</span> 
<span class="line">1475</span> </span><span class="WHIT">        </span><span class="COMM">//鼠标经过工具栏上的提示信息</span><span class="WHIT">
<span class="line">1476</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">tips</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="PUNC">}</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1477</span> </span><span class="WHIT">        </span><span class="NAME">tips</span><span class="PUNC">[</span><span class="STRN">"hander"</span><span class="PUNC">]</span><span class="WHIT">               </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="STRN">"拖动地图"</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1478</span> </span><span class="WHIT">        </span><span class="NAME">tips</span><span class="PUNC">[</span><span class="NAME">BMAP_DRAWING_MARKER</span><span class="PUNC">]</span><span class="WHIT">    </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="STRN">"画点"</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1479</span> </span><span class="WHIT">        </span><span class="NAME">tips</span><span class="PUNC">[</span><span class="NAME">BMAP_DRAWING_CIRCLE</span><span class="PUNC">]</span><span class="WHIT">    </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="STRN">"画圆"</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1480</span> </span><span class="WHIT">        </span><span class="NAME">tips</span><span class="PUNC">[</span><span class="NAME">BMAP_DRAWING_POLYLINE</span><span class="PUNC">]</span><span class="WHIT">  </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="STRN">"画折线"</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1481</span> </span><span class="WHIT">        </span><span class="NAME">tips</span><span class="PUNC">[</span><span class="NAME">BMAP_DRAWING_POLYGON</span><span class="PUNC">]</span><span class="WHIT">   </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="STRN">"画多边形"</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1482</span> </span><span class="WHIT">        </span><span class="NAME">tips</span><span class="PUNC">[</span><span class="NAME">BMAP_DRAWING_RECTANGLE</span><span class="PUNC">]</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="STRN">"画矩形"</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1483</span> 
<span class="line">1484</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">getItem</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="NAME">className</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">drawingType</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1485</span> </span><span class="WHIT">            </span><span class="KEYW">return</span><span class="WHIT"> </span><span class="STRN">'&lt;a class="'</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="NAME">className</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="STRN">'" drawingType="'</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="NAME">drawingType</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="STRN">'" href="javascript:void(0)" title="'</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="NAME">tips</span><span class="PUNC">[</span><span class="NAME">drawingType</span><span class="PUNC">]</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="STRN">'" onfocus="this.blur()"&gt;&lt;/a&gt;'</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1486</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1487</span> 
<span class="line">1488</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">html</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="PUNC">[</span><span class="PUNC">]</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1489</span> </span><span class="WHIT">        </span><span class="NAME">html.push</span><span class="PUNC">(</span><span class="NAME">getItem</span><span class="PUNC">(</span><span class="STRN">"BMapLib_box BMapLib_hander"</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="STRN">"hander"</span><span class="PUNC">)</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1490</span> </span><span class="WHIT">        </span><span class="KEYW">for</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">i</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NUMB">0</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">len</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">this.drawingModes.length</span><span class="PUNC">;</span><span class="WHIT"> </span><span class="NAME">i</span><span class="WHIT"> </span><span class="PUNC">&lt;</span><span class="WHIT"> </span><span class="NAME">len</span><span class="PUNC">;</span><span class="WHIT"> </span><span class="NAME">i</span><span class="PUNC">++</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1491</span> </span><span class="WHIT">            </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">classStr</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="STRN">'BMapLib_box BMapLib_'</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="NAME">this.drawingModes</span><span class="PUNC">[</span><span class="NAME">i</span><span class="PUNC">]</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1492</span> </span><span class="WHIT">            </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">i</span><span class="WHIT"> </span><span class="PUNC">==</span><span class="WHIT"> </span><span class="NAME">len</span><span class="PUNC">-</span><span class="NUMB">1</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1493</span> </span><span class="WHIT">                </span><span class="NAME">classStr</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="PUNC">=</span><span class="WHIT"> </span><span class="STRN">' BMapLib_last'</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1494</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1495</span> </span><span class="WHIT">            </span><span class="NAME">html.push</span><span class="PUNC">(</span><span class="NAME">getItem</span><span class="PUNC">(</span><span class="NAME">classStr</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">this.drawingModes</span><span class="PUNC">[</span><span class="NAME">i</span><span class="PUNC">]</span><span class="PUNC">)</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1496</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1497</span> </span><span class="WHIT">        </span><span class="KEYW">return</span><span class="WHIT"> </span><span class="NAME">html.join</span><span class="PUNC">(</span><span class="STRN">''</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1498</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1499</span> 
<span class="line">1500</span> </span><span class="WHIT">    </span><span class="COMM">/**
<span class="line">1501</span>      * 设置工具栏的缩放比例
<span class="line">1502</span>      */</span><span class="WHIT">
<span class="line">1503</span> </span><span class="WHIT">    </span><span class="NAME">DrawingTool.prototype._setScale</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="NAME">scale</span><span class="PUNC">)</span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1504</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">width</span><span class="WHIT">  </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NUMB">390</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1505</span> </span><span class="WHIT">            </span><span class="NAME">height</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NUMB">50</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1506</span> </span><span class="WHIT">            </span><span class="NAME">ml</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="PUNC">-</span><span class="NAME">parseInt</span><span class="PUNC">(</span><span class="PUNC">(</span><span class="NAME">width</span><span class="WHIT"> </span><span class="PUNC">-</span><span class="WHIT"> </span><span class="NAME">width</span><span class="WHIT"> </span><span class="PUNC">*</span><span class="WHIT"> </span><span class="NAME">scale</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">/</span><span class="WHIT"> </span><span class="NUMB">2</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NUMB">10</span><span class="PUNC">)</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1507</span> </span><span class="WHIT">            </span><span class="NAME">mt</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="PUNC">-</span><span class="NAME">parseInt</span><span class="PUNC">(</span><span class="PUNC">(</span><span class="NAME">height</span><span class="WHIT"> </span><span class="PUNC">-</span><span class="WHIT"> </span><span class="NAME">height</span><span class="WHIT"> </span><span class="PUNC">*</span><span class="WHIT"> </span><span class="NAME">scale</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">/</span><span class="WHIT"> </span><span class="NUMB">2</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NUMB">10</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1508</span> </span><span class="WHIT">        </span><span class="NAME">this.container.style.cssText</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="PUNC">[</span><span class="WHIT">
<span class="line">1509</span> </span><span class="WHIT">            </span><span class="STRN">"-moz-transform: scale("</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="NAME">scale</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="STRN">");"</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1510</span> </span><span class="WHIT">            </span><span class="STRN">"-o-transform: scale("</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="NAME">scale</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="STRN">");"</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1511</span> </span><span class="WHIT">            </span><span class="STRN">"-webkit-transform: scale("</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="NAME">scale</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="STRN">");"</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1512</span> </span><span class="WHIT">            </span><span class="STRN">"transform: scale("</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="NAME">scale</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="STRN">");"</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1513</span> </span><span class="WHIT">            </span><span class="STRN">"margin-left:"</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="NAME">ml</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="STRN">"px;"</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1514</span> </span><span class="WHIT">            </span><span class="STRN">"margin-top:"</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="NAME">mt</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="STRN">"px;"</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1515</span> </span><span class="WHIT">            </span><span class="STRN">"*margin-left:0px;"</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="COMM">//ie6、7</span><span class="WHIT">
<span class="line">1516</span> </span><span class="WHIT">            </span><span class="STRN">"*margin-top:0px;"</span><span class="PUNC">,</span><span class="WHIT">  </span><span class="COMM">//ie6、7</span><span class="WHIT">
<span class="line">1517</span> </span><span class="WHIT">            </span><span class="STRN">"margin-left:0px\\0;"</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="COMM">//ie8</span><span class="WHIT">
<span class="line">1518</span> </span><span class="WHIT">            </span><span class="STRN">"margin-top:0px\\0;"</span><span class="PUNC">,</span><span class="WHIT">  </span><span class="COMM">//ie8</span><span class="WHIT">
<span class="line">1519</span> </span><span class="WHIT">            </span><span class="COMM">//ie下使用滤镜</span><span class="WHIT">
<span class="line">1520</span> </span><span class="WHIT">            </span><span class="STRN">"filter: progid:DXImageTransform.Microsoft.Matrix("</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1521</span> </span><span class="WHIT">            </span><span class="STRN">"M11="</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="NAME">scale</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="STRN">","</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1522</span> </span><span class="WHIT">            </span><span class="STRN">"M12=0,"</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1523</span> </span><span class="WHIT">            </span><span class="STRN">"M21=0,"</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1524</span> </span><span class="WHIT">            </span><span class="STRN">"M22="</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="NAME">scale</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="STRN">","</span><span class="PUNC">,</span><span class="WHIT">
<span class="line">1525</span> </span><span class="WHIT">            </span><span class="STRN">"SizingMethod='auto expand');"</span><span class="WHIT">
<span class="line">1526</span> </span><span class="WHIT">        </span><span class="PUNC">]</span><span class="PUNC">.</span><span class="NAME">join</span><span class="PUNC">(</span><span class="STRN">''</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1527</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1528</span> 
<span class="line">1529</span> </span><span class="WHIT">    </span><span class="COMM">//绑定工具栏的事件</span><span class="WHIT">
<span class="line">1530</span> </span><span class="WHIT">    </span><span class="NAME">DrawingTool.prototype._bind</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="NAME">panel</span><span class="PUNC">)</span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1531</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">me</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">this</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1532</span> </span><span class="WHIT">        </span><span class="NAME">baidu.on</span><span class="PUNC">(</span><span class="NAME">this.panel</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="STRN">'click'</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1533</span> </span><span class="WHIT">            </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">target</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">baidu.getTarget</span><span class="PUNC">(</span><span class="NAME">e</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1534</span> </span><span class="WHIT">            </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">drawingType</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">target.getAttribute</span><span class="PUNC">(</span><span class="STRN">'drawingType'</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1535</span> </span><span class="WHIT">            </span><span class="NAME">me.setStyleByDrawingMode</span><span class="PUNC">(</span><span class="NAME">drawingType</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1536</span> </span><span class="WHIT">            </span><span class="NAME">me._bindEventByDraingMode</span><span class="PUNC">(</span><span class="NAME">drawingType</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1537</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1538</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1539</span> 
<span class="line">1540</span> </span><span class="WHIT">    </span><span class="COMM">//设置工具栏当前选中的项样式</span><span class="WHIT">
<span class="line">1541</span> </span><span class="WHIT">    </span><span class="NAME">DrawingTool.prototype.setStyleByDrawingMode</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="NAME">drawingType</span><span class="PUNC">)</span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1542</span> </span><span class="WHIT">        </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="PUNC">!</span><span class="NAME">drawingType</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1543</span> </span><span class="WHIT">            </span><span class="KEYW">return</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1544</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1545</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">boxs</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">this.panel.getElementsByTagName</span><span class="PUNC">(</span><span class="STRN">"a"</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1546</span> </span><span class="WHIT">        </span><span class="KEYW">for</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">i</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NUMB">0</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="NAME">len</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">boxs.length</span><span class="PUNC">;</span><span class="WHIT"> </span><span class="NAME">i</span><span class="WHIT"> </span><span class="PUNC">&lt;</span><span class="WHIT"> </span><span class="NAME">len</span><span class="PUNC">;</span><span class="WHIT"> </span><span class="NAME">i</span><span class="PUNC">++</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1547</span> </span><span class="WHIT">            </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">box</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">boxs</span><span class="PUNC">[</span><span class="NAME">i</span><span class="PUNC">]</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1548</span> </span><span class="WHIT">            </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">box.getAttribute</span><span class="PUNC">(</span><span class="STRN">'drawingType'</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">==</span><span class="WHIT"> </span><span class="NAME">drawingType</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1549</span> </span><span class="WHIT">                </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">classStr</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="STRN">"BMapLib_box BMapLib_"</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="NAME">drawingType</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="WHIT"> </span><span class="STRN">"_hover"</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1550</span> </span><span class="WHIT">                </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">i</span><span class="WHIT"> </span><span class="PUNC">==</span><span class="WHIT"> </span><span class="NAME">len</span><span class="WHIT"> </span><span class="PUNC">-</span><span class="WHIT"> </span><span class="NUMB">1</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1551</span> </span><span class="WHIT">                    </span><span class="NAME">classStr</span><span class="WHIT"> </span><span class="PUNC">+</span><span class="PUNC">=</span><span class="WHIT"> </span><span class="STRN">" BMapLib_last"</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1552</span> </span><span class="WHIT">                </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1553</span> </span><span class="WHIT">                </span><span class="NAME">box.className</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">classStr</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1554</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT"> </span><span class="KEYW">else</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1555</span> </span><span class="WHIT">                </span><span class="NAME">box.className</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">box.className.replace</span><span class="PUNC">(</span><span class="REGX">/_hover/</span><span class="PUNC">,</span><span class="WHIT"> </span><span class="STRN">""</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1556</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1557</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1558</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1559</span> 
<span class="line">1560</span> </span><span class="WHIT">    </span><span class="COMM">//设置工具栏当前选中的项样式</span><span class="WHIT">
<span class="line">1561</span> </span><span class="WHIT">    </span><span class="NAME">DrawingTool.prototype._bindEventByDraingMode</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="KEYW">function</span><span class="PUNC">(</span><span class="NAME">drawingType</span><span class="PUNC">)</span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1562</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">drawingManager</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">this.drawingManager</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1563</span> </span><span class="WHIT">        </span><span class="COMM">//点在拖拽地图的按钮上</span><span class="WHIT">
<span class="line">1564</span> </span><span class="WHIT">        </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">drawingType</span><span class="WHIT"> </span><span class="PUNC">==</span><span class="WHIT"> </span><span class="STRN">"hander"</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1565</span> </span><span class="WHIT">            </span><span class="NAME">drawingManager.close</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1566</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT"> </span><span class="KEYW">else</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1567</span> </span><span class="WHIT">            </span><span class="NAME">drawingManager.setDrawingMode</span><span class="PUNC">(</span><span class="NAME">drawingType</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1568</span> </span><span class="WHIT">            </span><span class="NAME">drawingManager.open</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1569</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1570</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1571</span> 
<span class="line">1572</span> </span><span class="WHIT">    </span><span class="COMM">//用来存储用户实例化出来的drawingmanager对象</span><span class="WHIT">
<span class="line">1573</span> </span><span class="WHIT">    </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">instances</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="PUNC">[</span><span class="PUNC">]</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1574</span> 
<span class="line">1575</span> </span><span class="WHIT">    </span><span class="COMM">/*
<span class="line">1576</span>      * 关闭其他实例的绘制模式
<span class="line">1577</span>      * @param {DrawingManager} 当前的实例
<span class="line">1578</span>      */</span><span class="WHIT">
<span class="line">1579</span> </span><span class="WHIT">    </span><span class="KEYW">function</span><span class="WHIT"> </span><span class="NAME">closeInstanceExcept</span><span class="PUNC">(</span><span class="NAME">instance</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1580</span> </span><span class="WHIT">        </span><span class="KEYW">var</span><span class="WHIT"> </span><span class="NAME">index</span><span class="WHIT"> </span><span class="PUNC">=</span><span class="WHIT"> </span><span class="NAME">instances.length</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1581</span> </span><span class="WHIT">        </span><span class="KEYW">while</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">index</span><span class="PUNC">--</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1582</span> </span><span class="WHIT">            </span><span class="KEYW">if</span><span class="WHIT"> </span><span class="PUNC">(</span><span class="NAME">instances</span><span class="PUNC">[</span><span class="NAME">index</span><span class="PUNC">]</span><span class="WHIT"> </span><span class="PUNC">!=</span><span class="WHIT"> </span><span class="NAME">instance</span><span class="PUNC">)</span><span class="WHIT"> </span><span class="PUNC">{</span><span class="WHIT">
<span class="line">1583</span> </span><span class="WHIT">                </span><span class="NAME">instances</span><span class="PUNC">[</span><span class="NAME">index</span><span class="PUNC">]</span><span class="PUNC">.</span><span class="NAME">close</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1584</span> </span><span class="WHIT">            </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1585</span> </span><span class="WHIT">        </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1586</span> </span><span class="WHIT">    </span><span class="PUNC">}</span><span class="WHIT">
<span class="line">1587</span> 
<span class="line">1588</span> </span><span class="PUNC">}</span><span class="PUNC">)</span><span class="PUNC">(</span><span class="PUNC">)</span><span class="PUNC">;</span><span class="WHIT">
<span class="line">1589</span> </span></pre></body></html>