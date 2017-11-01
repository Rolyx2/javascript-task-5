'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
getEmitter.isStar = false;
module.exports = getEmitter;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    return {
        events: {},

        /**
        * Подписаться на событие
        * @param {String} event
        * @param {Object} context
        * @param {Function} handler
        * @returns {Object}
        */
        on: function (event, context, handler) {
            this.events[event] = this.events[event] || [];
            this.events[event].push({
                person: context,
                func: handler
            });

            return this;

        },

        /**
        * Отписаться от события
        * @param {String} event
        * @param {Object} context
        * @returns {Object}
        */
        off: function (event, context) {
            if (!this.events[event]) {

                return this;
            }
            var eventsObj = this.events;
            Object.keys(eventsObj).filter(function (item) {
                return item.indexOf(event) !== -1;
            })
                .forEach(function (item) {
                    eventsObj[item] = eventsObj[item].filter(function (personalEvent) {

                        return personalEvent.person !== context;
                    });
                });

            return this;
        },

        /**
        * Уведомить о событии
        * @param {String} event
        * @returns {Object}
        */
        emit: function (event) {
            var eventsObj = this.events;
            var splitedEvent = event.split('.');
            splitedEvent.map(function (item, index) {
                return splitedEvent.slice(0, splitedEvent.length - index).join('.');
            }).forEach(function (item) {
                if (eventsObj[item]) {
                    eventsObj[item].forEach(function (personalEvent) {
                        personalEvent.func.call(personalEvent.person);
                    });
                }
            });

            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         */
        several: function (event, context, handler, times) {
            console.info(event, context, handler, times);
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         */
        through: function (event, context, handler, frequency) {
            console.info(event, context, handler, frequency);
        }
    };
}
