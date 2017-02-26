
ol.control.Lamis = function(options) {
  options = options || {};
  /**
   * @type {ol.Extent}
   * @private
   */
  this.extent_ = options.extent ? options.extent : null;
  this.coordinates;
  console.log('Debut Lamis')
  var self = this;
  var button = document.createElement('button');
  function handleClick_() {
    console.log('onClick recup coor', self.coordinates)
	self.handleCenter_(self.coordinates);
  };
  button.addEventListener('click', handleClick_, false);
  var className = options.className !== undefined ? options.className : 'ol-Center';
  var label = options.label !== undefined ? options.label : 'C';
  var tipLabel = 'Recentrer';
  
  button.setAttribute('type', 'button');
  button.title = tipLabel;
  //button.appendChild(
    //typeof label === 'string' ? document.createTextNode(label) : label
  //);fa fa-arrows
  button.innerHTML = '<i class="fa fa fa-arrows" aria-hidden="true"></i>';

  var cssClasses = className + ' ' + 'ol-button ol-unselectable ol-control';
  var element = document.createElement('div');
  element.className = cssClasses;
  element.appendChild(button);

  ol.control.Control.call(this, {
    element: element,
    target: options.target
  });
};
ol.inherits(ol.control.Lamis, ol.control.Control);


ol.control.Lamis.prototype.handleCenter_ = function(coordinates) {
  var map = this.getMap();
  var view = map.getView();
  var extent = !this.extent_ ? view.getProjection().getExtent() : this.extent_;
  view.setCenter(coordinates)
};
ol.control.Lamis.prototype.setMap = function(map) 
{   
	ol.control.Control.prototype.setMap.call(this, map);
	map.on('click', function (evt) {
	        console.log('evtMap', evt.coordinate)
		    this.setCoordinate_(evt.coordinate) 			
		}, this)
};

ol.control.Lamis.prototype.setCoordinate_ = function(coordinates) {
    this.coordinates = coordinates
};
