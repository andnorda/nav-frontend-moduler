import React from 'react';

import { Undertittel } from 'NavFrontendModules/nav-frontend-typografi';

class TableOfContents extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.headlines);
        this.tree = [];
        this.buildTree();
    }

    buildTree = () => {
        let prevHeadline = undefined;

        this.props.headlines.forEach((headline, index) => {
            if (prevHeadline) {
                if (headline.type > prevHeadline.type) {
                    headline.parent = prevHeadline;
                } else if (headline.type === prevHeadline.type) {
                    headline.parent = prevHeadline.parent;
                } else {
                    while (prevHeadline.parent && prevHeadline.parent.type && prevHeadline.parent.type >= headline.type) {
                        prevHeadline = prevHeadline.parent;
                    }
                    headline.parent = prevHeadline.parent;
                }
            }

            prevHeadline = headline;

            this.tree.push(headline);
        });
    }

    findHeadlineChildren = (headline) => {
        return this.props.headlines.filter((hl, index) => {
            return hl.parent === headline;
        });
    }

    renderTOCList = (headlines) => {
        return (
            <ol>
                {headlines.map((headline) => this.renderTOCItem(headline))}
            </ol>
        );
    }

    renderTOCItem = (headline) => {
        const children = this.findHeadlineChildren(headline);
        return (
            <li key={headline.id}>
                <a href={`#${headline.id}`}>{headline.title}</a>
                {
                    children && 
                    this.renderTOCList(children)
                }
            </li>
        );
    }

    render() {
        const rootItems = this.findHeadlineChildren(undefined);
        return (
            <nav className="table-of-contents">
                <Undertittel>Innhold:</Undertittel>
                {
                    this.renderTOCList(rootItems)
                }
            </nav>
        );
    }
}

export default TableOfContents;
