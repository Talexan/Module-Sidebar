define(['uiComponent', 
        'ko', 
        'parser', 
        'Magento_Customer/js/customer-data', 
        'underscore', 
        'domReady!'], 
        function (component, ko, parser, customData, _) {
    'use strict';

    const _sectionName = 'talexanSidebar';

// Public:
return component.extend({
    
    init: function() {
        var  getProducts = parser.getProductsOnCurrentPage();
        var randomProducts = _.sample(getProducts, 3);
        var getHtmlSpecProducts = parser.getItemForSpecifiedProducts(randomProducts);
        customData.set(_sectionName, getHtmlSpecProducts);
    },

    initialize: function() {
        this._super();
        this.init();
        this.customSidebar = customData.get(_sectionName);
    }
});
});