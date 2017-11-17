//点到点之间距离
function pointToPoint(a,b){
	let ans = [];
	let res = Math.sqrt(Math.pow(a.x-b.x,2)+Math.pow(a.y-b.y,2));
	ans.push(res,a,b);
	return ans;
}
//点到线距离
function pointToLine(p1,p2,p) {
    let ans = [];
    let a = pointToPoint(p1,p2)[0];
    let b = pointToPoint(p1,p)[0];
    let c = pointToPoint(p2,p)[0];
    if(a*a == c*c + b*b){ //点在线段上
    	ans.push(0,p,p1);
    	return ans;
    }
    if (c*c >= a*a + b*b) { //组成直角三角形或钝角三角形，p1为直角或钝角
      ans.push(b,p,p1);
      return ans;
    }
    if (b * b >= a * a + c * c) {// 组成直角三角形或钝角三角形，p2为直角或钝角
      ans.push(c,p,p2);
      return ans;
    }
    // 组成锐角三角形，则求三角形的高
    let pp = (a+b+c) / 2;// 半周长
    let s = Math.sqrt(pp * (pp - a) * (pp - b) * (pp - c));// 海伦公式求面积
    let res = 2*s / a; //垂线长度

    let lines = line(p1,p2);
  	let rea = coordinate(lines,p);

	ans.push(res,p,rea);
    return ans;
}	

//计算垂足坐标
function coordinate(lines,p){
	let k = -1/lines.k;
    let b = p.y-k*p.x;
    let x = (lines.b - b)/(k-lines.k);
    let y = k*x+b;
    return {x:x,y:y};
}
//直线方程参数Ax+By+c=0;y=kx+b;
function line(p1,p2){
	let k = (p1.y-p2.y)/(p1.x-p2.x);
	let b = p2.y-k*p2.x;
	return {k:k,b:b,A:1,B:-k,C:-b}
}

//两个凸多变形间最短距离
function isShort(targetA,targetB){
	let result = pointToPoint(targetA[0],targetB[0]);
	let ans = [];
	for(let i = 0 ;i < targetA.length ; i++){
		let iadd = i+1;
		if(iadd == targetA.length){
			iadd = 0;
		}
		for(let n = 0 ; n < targetB.length ; n++){
			let nadd = n+1;
			if(nadd == targetB.length){
				nadd = 0;
			}
			let q = pointToPoint(targetB[n],targetA[i]);
			let r = pointToLine(targetA[i],targetA[iadd],targetB[n]);
			let s = pointToLine(targetB[n],targetB[nadd],targetA[i]);
			let mm = (q[0] > r[0]) ? r : q;
			let m = (mm[0] > s[0]) ? s : mm;
			if(result[0] > m[0]){
				result = m;
			}
		}
	}
	return result;
}

//计算每种方案的最佳路径
function all(){
	let arg = arguments.length;
	let r = [arguments[0][0] + arguments[1][0] + arguments[arg-2][0],arguments[0],arguments[1],arguments[arg-2]];
	let s = [arguments[0][0] + arguments[1][0] + arguments[arg-1][0],arguments[0],arguments[1],arguments[arg-1]];
	results = r[0] > s[0] ? s : r;	
	return results;
}

/*//平行线间距离,因为题目中没有无限长平行线段，因此可将平行线间距离考虑成点到线间距离
function lineToLine(p1,p2,p3,p4){
	let ans = [];
	let L1 = line(p1,p2);
	let L2 = line(p3,p4);
	let p3coordinate = coordinate(L2,p3);
	let p4coordinate = coordinate(L2,p4);
	if(maxminxy(p1,p2)[0][0] <= p3coordinate.x && p3coordinate.x <= maxminxy(p1,p2)[0][1] && maxminxy(p1,p2)[1][0] <= p3coordinate.y &&　p3coordinate.y <= maxminxy(p1,p2)[1][1]){
		let L1L2 = Math.abs(L2.C-L1.C)/Math.sqrt(Math.pow(L1.A,2)+Math.pow(L1.B,2));
		ans.push(L1L2,p3,p3coordinate);
	}else if(maxminxy(p1,p2)[0][0] <= p4coordinate.x && p4coordinate.x <= maxminxy(p1,p2)[0][1] && maxminxy(p1,p2)[1][0] <= p4coordinate.y &&　p4coordinate.y <= maxminxy(p1,p2)[1][1]){
		let L1L2 = Math.abs(L2.C-L1.C)/Math.sqrt(Math.pow(L1.A,2)+Math.pow(L1.B,2));
		ans.push(L1L2,p4,p4coordinate);
	}else{
		let p1p3 = pointToPoint(p1,p3);
		let p2p3 = pointToPoint(p2,p3);
		let p1p4 = pointToPoint(p1,p4);
		let p2p4 = pointToPoint(p2,p4);
		let L1L2 = p1p3;
		if(L1L2[0] > p2p3[0]){
			L1L2 = p2p3;
		}
		if(L1L2[0] > p1p4[0]){
			L1L2 = p1p4;
		}
		if(L1L2[0] > p2p4[0]){
			L1L2 = p2p4;
		}
		ans.push(L1L2[0],L1L2[1],L1L2[2]);
	}
	return ans;
}
function maxminxy(p1,p2){
	let x = [p1.x,p2.x].sort(function (a,b) {return a-b;});
	let y = [p1.y,p2.y].sort(function(a,b) {return a-b;});
	return [x,y];
}*/

