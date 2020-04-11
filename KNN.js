class KNN{
  constructor(){
    this.k = 3;
    this.points = [];
  }
  
  classify(k, x, y){
    if (this.points.length < 3) return;
    this.k = k;
    let d, dists=[], p, preds={}, pred_cls;
    this.points.forEach( (pt, ind) => {
      d = this.dist(x, y, pt.x, pt.y);
      dists.push([d, ind, pt.cls]);
    });
    
    dists = dists.sort((a, b) => (a[0] - b[0]));
    strokeWeight(2);
    for(let i=0; i<this.k; i++){      
      p = dists[i][2];
      preds[p] = preds[p] + 1 || 1;
      stroke(colors[dists[i][2]]);
      line(x, y, this.points[dists[i][1]].x, this.points[dists[i][1]].y);
    }
    pred_cls = Object.keys(preds).reduce((a, b) => preds[a] > preds[b] ? a : b);
    prediction.html(pred_cls);
    prediction.style("background-color", color(colors[pred_cls]));
  }
  
  setK(k){
    this.k = k;
  }
  
  addPoint(cls, x, y){
    if (cls != '')
      this.points.push(new Point(cls, x, y));
  }
  
  dist(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
  }
}