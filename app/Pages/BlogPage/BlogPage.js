import React, {PureComponent} from 'react';
import styles from './BlogPage.css';
import CongressHall from 'Modules/CongressHall';
import BlogCard from 'Modules/Cards/BlogCard';

const data = {
	title: 'Наши мероприятия',
	desc: 'Одним из крупнейших центров делового туризма на Черноморском побережье Краснодарского края и специализируется на организации MICE (Meetings, Incentives, Conferences, Exhibitions) мероприятий на море.',
	blogs: [
		{
			id: 1,
			title: 'Новое мероприятие в этом году',
			date: 'январь 2019',
			desc: 'Одним из крупнейших центров делового туризма на Черноморском побережье Краснодарского края и специализируется на организации MICE (Meetings, Incentives, Conferences, Exhibitions) мероприятий на море. Одним из крупнейших центров делового туризма на Черноморском побережье Краснодарского края и специализируется на организации MICE (Meetings, Incentives, Conferences, Exhibitions) мероприятий на море.',
			pictures: 'public/blog_image_1.png'
		},
		{
			id: 2,
			title: 'Первое мероприятие в этом году',
			date: 'январь 2019',
			desc: 'Одним из крупнейших центров делового туризма на Черноморском побережье Краснодарского края и специализируется на организации MICE (Meetings, Incentives, Conferences, Exhibitions) мероприятий на море. Одним из крупнейших центров делового туризма на Черноморском побережье Краснодарского края и специализируется на организации MICE (Meetings, Incentives, Conferences, Exhibitions) мероприятий на море.Одним из крупнейших центров делового туризма на Черноморском побережье Краснодарского края и специализируется на организации MICE (Meetings, Incentives, Conferences, Exhibitions) мероприятий на море. Одним из крупнейших центров делового туризма на Черноморском побережье Краснодарского края и специализируется на организации MICE (Meetings, Incentives, Conferences, Exhibitions) мероприятий на море.',
			pictures: 'public/blog_image_2.png'
		}
	]
};

class BlogPage extends PureComponent {
	render() {
		return (
			<main className={styles.root}>
				<CongressHall title={data.title} desc={data.desc} className={styles.congress}/>
				{data.blogs.map(blog => (
					<BlogCard key={blog.id} {...blog}/>
				))}
			</main>
		);
	}
}

export default BlogPage;
