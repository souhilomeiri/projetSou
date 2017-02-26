
ol.control.Refresh = function(options) {
  options = options || {};
  /**
   * @type {ol.Extent}
   * @private
   */
  this.extent_ = options.extent ? options.extent : null;
  this.newMap;
  console.log('Debut Lamis')
  var self = this;
  var button = document.createElement('button');
  function handleClick_() {
	self.handleRefresh_(self.newMap);
  };
  button.addEventListener('click', handleClick_, false);
  var className = options.className !== undefined ? options.className : 'ol-Refresh';
  var label = options.label !== undefined ? options.label : '';
  var tipLabel = 'Rafraichir la carte';
  
  button.setAttribute('type', 'button');
  button.title = tipLabel;
  button.innerHTML = '<i class="fa fa-refresh" aria-hidden="true"></i>';

  var cssClasses = className + ' ' + 'ol-button ol-unselectable ol-control';
  var element = document.createElement('div');
  element.className = cssClasses;
  element.appendChild(button);

  ol.control.Control.call(this, {
    element: element,
    target: options.target
  });
};
ol.inherits(ol.control.Refresh, ol.control.Control);


ol.control.Refresh.prototype.handleRefresh_ = function(newMap) {
  this.setMap(newMap);
  };
ol.control.Refresh.prototype.setMap = function(map) 
{   
	ol.control.Control.prototype.setMap.call(this, map);
	map.on('click', function (evt) {
		    this.setNewMap_(map) 			
		}, this)
};

ol.control.Refresh.prototype.setNewMap_ = function(newMap) {
    this.newMap = newMap
};
