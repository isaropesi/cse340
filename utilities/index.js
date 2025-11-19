const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* ****************************************
* Builds the HTML for the vehicle detail view
* *************************************** */
Util.buildVehicleDetail = function(vehicle) {
  // Helper function for currency formatting (no decimals)
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  // Helper function for mileage formatting (commas)
  const milesFormatter = new Intl.NumberFormat('en-US');

  let detailHTML = `
    <div id="detail-wrapper" class="p-4 grid gap-6 md:grid-cols-2">
      <!-- Image Column -->
      <div class="detail-image-box flex justify-center items-start">
        <img src="${vehicle.inv_image.replace('/tn', '')}" 
             alt="${vehicle.inv_make} ${vehicle.inv_model} - Full View" 
             class="w-full max-w-md rounded-lg shadow-lg">
      </div>
      
      <!-- Details Column -->
      <div class="detail-info-box bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 class="text-3xl font-bold mb-4">${vehicle.inv_make} ${vehicle.inv_model}</h2>
        
        <p class="text-4xl font-extrabold text-green-700 mb-6 detail-price">
            <span class="text-xl font-semibold text-gray-700">Price:</span> 
            ${formatter.format(vehicle.inv_price)}
        </p>

        <ul class="detail-list space-y-3 text-lg">
          <li><strong>Year:</strong> ${vehicle.inv_year}</li>
          <li><strong>Mileage:</strong> ${milesFormatter.format(vehicle.inv_miles)} miles</li>
          <li><strong>Color:</strong> ${vehicle.inv_color}</li>
          <li><strong>Description:</strong> 
            <p class="mt-2 text-gray-600">${vehicle.inv_description}</p>
          </li>
        </ul>
      </div>
    </div>
  `
  return detailHTML
}


/* ****************************************
 * Middleware For Handling Errors (Task 2)
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util