export const Button = {
    variants: {
			nav: {
				bg: "g.500",
				borderRadius: "full",
				w: "100px",
				opacity: "0.7",
				_hover: {
					opacity: "1"
				}
			},
			form: {
				bg: "dg.500",
				opacity: "0.7",
				_hover: {
					opacity: "1"
				}
			},
			card: {
				bg: "y.500",
				opacity: "0.7",
				_hover: {
					opacity: "1"
				}
			}
		},
		defaultProps: {
			transition: "0.3s"
		}
}