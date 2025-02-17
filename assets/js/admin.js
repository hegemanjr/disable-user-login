/*global jQuery, document, ajaxurl */
(function($) {
	"use strict";

	var SS_DUL = {
		init: function() {
			$( document )
				.on( 'click', 'a.dul-quick-links', SS_DUL.toggleDisabled )
		},

		/**
		 * Disable user
		 * @param {*} e
		 */
		toggleDisabled: function( e ) {
			e.preventDefault();
			var $this = $(this);
			var action = $this.attr('data-dul-action');
			var user_id = $this.data('dul-user-id');

			var data = {
				action: 'ssdul_enable_disable_user',
				data: {
					user_id: user_id,
					action: action
				},
				nonce: SSDUL.nonces.quick_links
			};

			console.log(`${action} user id: ${user_id}`);

			$.post(ajaxurl, data, function(response) {
				console.log(response);

				// try {
				// 	result = $.parseJSON(response);
				// } catch (err) {
				// 	console.error(err);
				// 	// alert(SSWCMC.messages.error_loading_groups);
				// }

				if (response.error) {
					alert(`Error: can't ${action} user ${user_id}.`)
					return;
				}

				if (action == 'disable') {
					$this.hide().text('Enable').fadeIn( 'slow' );
					$this.attr('data-dul-action', 'enable');
					$this.parents().find('tr[id=user-' + user_id + '] td[data-colname="Disabled"]').text('Disabled');
					$this.parents().find('tr[id=user-' + user_id + '] td[data-colname="Disabled"]').hide().fadeIn( 'slow' );
				} else {
					$this.hide().text('Disable').fadeIn( 'slow' );
					$this.attr('data-dul-action', 'disable');
					$this.parents().find('tr[id=user-' + user_id + '] td[data-colname="Disabled"]').text('');
					$this.parents().find('tr[id=user-' + user_id + '] td[data-colname="Disabled"]').hide().fadeIn( 'slow' );
				}
			});
		},

	};

	SS_DUL.init();

})(jQuery);
