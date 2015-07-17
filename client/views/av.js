var startVisualize = function() {
  console.log("from visualize!")
  var ctx = new AudioContext();
  var audio = document.getElementById('audio');
  var audioSrc = ctx.createMediaElementSource(audio);
  var analyser = ctx.createAnalyser();
  analyser.fftSize = 512;
  // we have to connect the MediaElementSource with the analyser 
  audioSrc.connect(analyser);
  // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
 
  // frequencyBinCount tells you how many values you'll receive from the analyser
  var frequencyData = new Float32Array(analyser.frequencyBinCount);
 
  // we're ready to receive some data!
  // loop

  var visualizer = d3.select('.visualizer')
                  .style('width', '100%')
                  .style('height', '500px')
                  .style('max-width', '960px')
                  .style('margin', '0 auto')
                  

  for (var i = 0; i < 256; i++) {
    visualizer.append('rect')
             .attr('x', function(d) {
              return i * 3.75; 
             })
             .attr('width', 2.75);

    // visualizer.append('rect')
    //           .attr('cx', cx)
    //           .attr('cy', cy)
    //           .attr('r', 2)
    //           .attr('fill', 'rgba(0, 120, 120, .75)');
  }



  function renderFrame() {
     requestAnimationFrame(renderFrame);
     // update data in frequencyData
     analyser.getFloatFrequencyData(frequencyData);
     // render frame based on values in frequencyData
     // console.log(frequencyData)

     visualizer.selectAll('rect')
               .data(frequencyData)
               .attr('y', function(d) {
                return 300 - Math.abs(d);
               })
               .attr('height', function(d) {
                return Math.abs(d) + 100;
               })
               .attr('fill', function(d) {
                return 'rgb(0, 120, 120)';
               });
     

  }
  renderFrame();
};