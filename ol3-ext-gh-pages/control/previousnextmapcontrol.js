
/*
 * @classdesc
 * Un bouton control qui centre la carte en cliquant dessus
 *
 * @constructor
 * @extends {ol.control.Control}
 * @param {Options=} optOptions Options.
 * @api
 */
ol.control.PreviousNext= function (optOptions) {
  let options = optOptions || {}

  this.history = []
  this.history_now = -1
  this.click = false
  this.delay = 350 //611
  let self = this
  // Bouton précedent
  let button = document.createElement('button')
  function handleClickPrevious_ () {
    self.previous_()
  }
  button.addEventListener('click', handleClickPrevious_, false)
  let tipLabel = 'Zoom précédent'
  button.setAttribute('type', 'button')
  button.title = tipLabel
  button.innerHTML = '<i class="fa fa-arrow-left" aria-hidden="true"></i>'
  // Bouton suivant
  let buttonNext = document.createElement('button')
  function handleClickNext_ () {
    self.next_()
  }
  buttonNext.addEventListener('click', handleClickNext_, false)
  let tipLabelNext = 'Zoom suivant'
  buttonNext.setAttribute('type', 'button')
  buttonNext.title = tipLabelNext
  buttonNext.innerHTML = '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
  // div principal
  let className = options.className !== undefined ? options.className : 'ol-PreviousNext'
  let cssClasses = className + ' ' + 'ol-button ol-unselectable ol-control'
  let element = document.createElement('div')
  element.className = cssClasses
  element.appendChild(button)
  element.appendChild(buttonNext)

  ol.control.Control.call(this, {
    element: element,
    target: options.target
  })
}
ol.inherits(ol.control.PreviousNext, ol.control.Control)

/**
 * @param {Array} coordinates coordonnées du clique ou on va centrer
 * @private traitement du  onClick
 */
ol.control.PreviousNext.prototype.previous_ = function () {
  console.log('Je suis dans previous et click =', this.click)
  let map = this.getMap()
  if (this.history_now > 0) {
    this.click = true
    this.history_now--
    map.getView().setCenter(this.history[this.history_now].center)
    map.getView().setZoom(this.history[this.history_now].zoom)
	
	var xx = this
    // this.click = false
    setTimeout(function () {
	  xx.click = false
	  xx.setClick_(false)
    }, this.delay)
  }
  console.log('après setTimePrécident click =', this.click)
}
/**
 * @param {Array} coordinates coordonnées du clique ou on va centrer
 * @private traitement du  onClick
 */
ol.control.PreviousNext.prototype.next_ = function () {
  console.log('Je suis dans next et click =', this.click)
  let map = this.getMap()
  if ((this.history_now >= 0) & (this.history_now < this.history.length - 1)) {
    this.click = true
    this.history_now++
    map.getView().setCenter(this.history[this.history_now].center)
    map.getView().setZoom(this.history[this.history_now].zoom)
    // this.click = false
    setTimeout.apply()(function () {
      this.setClick_(false)
    }, this.delay)
  }
  console.log('après setTimeSuivant click =', this.click)
}

/**
 * @param {Array} map
 * @private redefinir le setMap
 */
ol.control.PreviousNext.prototype.setMap = function (map) {
  ol.control.Control.prototype.setMap.call(this, map)
  map.on('moveend', function (evt) {
    // Do not save view history if previous/next was clicked
    console.log('Je suis dans set map et click', this.click)
    console.log('Je suis dans set map nowAvant', this.history_now)
    if (this.click) return
    this.history.push({
      center: map.getView().getCenter(),
      zoom: map.getView().getZoom()
    })
    this.history_now++
	console.log('Je suis dans set map après incrément, click =', this.click)
    console.log('Je suis dans set map après incrément, nowAvant =', this.history_now)
  }, this)
}
/**
 * @param {Array} coordinates
 * @private setter
 */
ol.control.PreviousNext.prototype.setClick_ = function (click) {
  console.log('xxxxxxxxxxx', click)
  this.click = click
}



