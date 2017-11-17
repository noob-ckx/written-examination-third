/*--------------------------------------------------------------------------------------
| 作者：ckx
| 思路：
|		1.凸多边形最小间距问题，可转化为点与点、点与线、线与线距离问题；
|		2.写点到点距离函数
| 		3.写点到线距离函数
|		4.写线到线距离函数，本题中不存在无限长平行线，因此可将线与线问题转化为点与线问题
|		5.写两两图形之间最短距离函数
|		5.计算两个岛屿与河岸相连的长度，此时会有三座桥
|		6.计算一个岛屿与河岸相连的长度，此时会有三座桥
| 说明：
|		1.根据绘图后发现，A、B岛屿间最短距离会穿过C岛，可进行忽略，或重新计算一条新路经
|		2.重新计算A、B之间路径，①：可以将A,B最短路径向下平移，直至穿过C岛最后一个点
|								②：计算A到最后一个点到B岛最近距离，此时也会穿过C岛，可以以A最后一点及C最后一点做直线，与B岛相交
|								③：计算①，②中最短距离，即为A,B岛屿间最短距离
|		3.根据以上计算，可以得出一条穿过C岛一点的桥，若将此桥看成为一座，即题中最少桥数应为两条。
|		4.程序中没有计算以上步骤。
|		5.题中所有数组返回格式为[长度，端点坐标，端点坐标]；
|		6.finall函数返回格式：[桥总长度，[第一个桥的长度，桥的端点坐标，桥的端点坐标],[第二个桥的长度,...,...]...]
-----------------------------------------------------------------------------------------------------*/


var river = [{x:40, y:320}, {x:60, y:60}, {x:420, y:20}, {x:550, y:330}, {x:250, y:400}];
var landA = [{x:150, y:210}, {x:180, y:160}, {x:240, y:190}, {x:220, y:230}];
var landB = [{x:420, y:260}, {x:400, y:210}, {x:470, y:240}];
var landC = [{x:280, y:190}, {x:320, y:150}, {x:400, y:160}, {x:350, y:240}, {x:300, y:240}];

var c = document.getElementById("myCanvas");
var ctx=c.getContext("2d");
function paint(p,color){
	ctx.beginPath();
	ctx.moveTo(p[0].x,p[0].y);
	for(let i = 1 ; i < p.length ;i++){
		ctx.lineTo(p[i].x,p[i].y);
	}
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
}

paint(river,"#F1F1FA");
paint(landA,"#B7F2C5" );
paint(landB,"#B7F2C5");
paint(landC,"#B7F2C5");

var text = document.getElementById('p');
var r = finall();//获取计算后最短路径
var nBridge = 0;
for(let i = 1 ; i < r.length ;i++){
	ctx.beginPath();
	ctx.moveTo(r[i][1].x ,r[i][1].y);
	ctx.lineTo(r[i][2].x ,r[i][2].y);
	ctx.strokeStyle="black";
 	ctx.stroke();
	ctx.closePath();
	if(r[i][0] != 0){
		nBridge++;
	}
}
text.innerHTML = "桥总长为：" + r[0] + "<br/>" +"共有" + nBridge + "座桥";

//所有方案最短路径
function finall(){
	//存储两两岛屿间最短路径
	let arr = [isShort(river,landA),isShort(river,landB),isShort(river,landC)];
	let arrland = [isShort(landA,landC),isShort(landB,landC),isShort(landA,landB)];

	//方案一：有三座桥与河岸相连
	let abcResult = [arr[0][0]+arr[1][0]+arr[2][0],arr[0],arr[1],arr[2]];

	//方案二：有两座桥与河岸相连
	let bC = all(arr[1],arr[2],arrland[0],arrland[2]);//B,C与河岸相连,判断A到B近还是到C近,返回最短一条线路
	let aC = all(arr[0],arr[2],arrland[1],arrland[2]);//A,C与河岸相连..........
	let bA = all(arr[0],arr[1],arrland[0],arrland[1]);//A,B与河岸相连..........
	let resultA = compare(compare(bC,aC),bA);

	//方案三：有一座桥与河岸相连
	let bToriver = all(arr[1],arrland[0],arrland[1],arrland[2]);//B与河岸相连
	let cToriver = all(arr[2],arrland[2],arrland[1],arrland[0]);//C与河岸相连
	let aToriver = all(arr[0],arrland[1],arrland[2],arrland[0]);//A与河岸相连
	let resultB = compare(compare(bToriver,cToriver),aToriver);

	return compare(compare(resultA,resultB),abcResult);
}

function compare(a,b){
	return a[0] > b[0] ? b : a;
}


