import Skeleton from "react-loading-skeleton";

import styles from '../styles/CardCatechumenSkeleton.module.css';

function CatechumenCardSkeleton() {
	return (
		<div className="catequizando-card">
			<div
				style={{
					width: '100%',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					gap: '12px',
					flexWrap: 'wrap'
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '5px',
						flex: 1,
						minWidth: '200px'
					}}
				>
					<Skeleton height={20} className={styles.nameCatechumen} />
					<Skeleton height={15} className={styles.stepAndNameCatechist} />
					<Skeleton height={15} className={styles.stepAndNameCatechist} />
				</div>
				<div
					style={{
						display: 'flex',
						gap: '5px',
						flexWrap: 'wrap'
					}}
				>
					<Skeleton height={40} width={100} />
					<Skeleton height={40} width={100} />
				</div>
			</div>
		</div>
	)
}

export default CatechumenCardSkeleton;