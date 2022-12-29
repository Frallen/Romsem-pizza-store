'use strict';

/**
 * delivery-n-pay service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::delivery-n-pay.delivery-n-pay');
