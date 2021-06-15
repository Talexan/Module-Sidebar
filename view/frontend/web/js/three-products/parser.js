define(['jquery'], function ($) {
    'use strict';
// Private:

    const _parentSelector = "li.product-item",
          _parseHref = "a.product-item-photo",
          _parseSelectorLinks = "div.product-item-info div.product-item-details strong.product-item-name",
          _parseSelectorParentImg = "span.product-image-wrapper",
          _parseSelectorPhoto = "img.product-image-photo",
          _parseSelectorPrice = "span.price";
    var items = [];

    /**
     * Prepare item
     * @param  Object domElement
     * @return Object item
     */
    function _prepareItem(domElement) {
        var item = {};
        var parent = $(domElement).parentsUntil(_parentSelector).last();
        item.a = domElement.innerHTML;
        item.href = $(parent).find(_parseHref).attr("href");
        item.img = $(parent).find(_parseSelectorParentImg)
                            .clone()
                            .find(_parseSelectorPhoto)
                            .attr({"width":"48", "height":"64", "style": "position: static;"})
                            .parent().html();
        item.price = $(parent).find(_parseSelectorPrice).html();
        return item;
    };
    
    // Public:
    return {
         /**
         * Add item into items
         */
        addItem: (item) => {
            items.push(item);
        },

         /**
         *  Get property - items
         * @return array item
         */
        getItems: () => {
            return items;
        },

        /**
         * Clear items
         */
        clearItems: () => {
            items.slice(0);
        }, 

        /** 
         * Get result list products on the current page
         * @return array
        */
        getProductsOnCurrentPage: function () {
            var listProducts = $(_parseSelectorLinks).get();
            listProducts = jQuery.unique(listProducts);
            return listProducts;
           },

        /**
         * Get html code for specified products
         * @param array specifiedProducts
         * @return array
         */
        getItemForSpecifiedProducts: function (specifiedProducts) {
            this.clearItems();
            specifiedProducts.forEach(function(product) {
                var item = _prepareItem(product);
                (item.href)? this.addItem(item): null;
            });
            return this.getItems();
        }
    };
});
