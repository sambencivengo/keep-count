import { DeepPartial, extendTheme, Theme, ThemeConfig } from '@chakra-ui/react';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
	initialColorMode: 'system',
	useSystemColorMode: true,
};

export const colors = {
	darkBlueGrey: '#2B2D42',
	midBlueGrey: '#8D99AE',
	lightGrey: '#EDF2F4',
	orange: '#f77f00',
	deepRed: '#D90429',
};

export const theme = extendTheme({
	...config,
	components: {
		Button: {
			variants: {
				solid: () => ({
					bg: colors.orange,
					color: colors.lightGrey,
					_hover: {
						bg: colors.midBlueGrey,
					},
				}),
			},
		},
		Input: {
			variants: {
				filled: {
					field: {
						_focus: {
							borderColor: colors.orange,
						},
						borderColor: mode(
							colors.darkBlueGrey,
							colors.lightGrey
						),
					},
				},
			},
		},
	},
	styles: {
		global: (props: StyleFunctionProps) => ({
			body: {
				backgroundColor: mode(
					colors.lightGrey,
					colors.darkBlueGrey
				)(props),
				color: mode(colors.darkBlueGrey, colors.lightGrey)(props),
			},
			'::-webkit-scrollbar': { display: 'none' },
		}),
	},
	colors,
}) as DeepPartial<Theme>;
