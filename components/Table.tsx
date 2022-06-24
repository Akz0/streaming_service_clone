import { CheckIcon } from '@heroicons/react/solid';
import { Product } from '@stripe/firestore-stripe-payments';

interface Props {
	products: Product[];
	selectedPlan: Product;
}

function Table({ products, selectedPlan }: Props) {
	return (
		<table>
			<tbody className="divide-y divide-[#4f4f4f]">
				<tr className="tableRow">
					<td className="tableDataTitle">Monthly Price</td>
					{products.map((product) => {
						return (
							<td
								key={product.id}
								className={`tableDataFeature ${
									selectedPlan.id === product.id
										? 'text-[#e50914]'
										: 'text-[gray]'
								}`}
							>
								₹ {product?.prices[0].unit_amount! / 100}
							</td>
						);
					})}
				</tr>

				<tr className="tableRow">
					<td className="tableDataTitle">Video Quality</td>
					{products.map((product) => {
						return (
							<td
								key={product.id}
								className={`tableDataFeature ${
									selectedPlan.id === product.id
										? 'text-[#e50914]'
										: 'text-[gray]'
								}`}
							>
								{product?.metadata?.videoQuality}
							</td>
						);
					})}
				</tr>

				<tr className="tableRow">
					<td className="tableDataTitle">Resolution</td>
					{products.map((product) => {
						return (
							<td
								key={product.id}
								className={`tableDataFeature ${
									selectedPlan.id === product.id
										? 'text-[#e50914]'
										: 'text-[gray]'
								}`}
							>
								{product?.metadata?.resolution}
							</td>
						);
					})}
				</tr>

				<tr className="tableRow">
					<td className="tableDataTitle">Watch on Web,TV and Mobile</td>
					{products.map((product) => {
						return (
							<td
								key={product.id}
								className={`tableDataFeature ${
									selectedPlan.id === product.id
										? 'text-[#e50914]'
										: 'text-[gray]'
								}`}
							>
								{product?.metadata?.portable ? (
									<CheckIcon className="inline-block h-8 w-8" />
								) : (
									''
								)}
							</td>
						);
					})}
				</tr>
			</tbody>
		</table>
	);
}

export default Table;
