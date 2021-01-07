import React, {Component} from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
    btns = [
        {label: 'all', text: 'All'},
        {label: 'active', text: 'Active'},
        {label: 'done', text: 'Done'},
    ];

    render() {
        const {filter, onFilterChange} = this.props;

        const btns = this.btns.map(({label, text}) => {
            const isActive = filter === label;
            const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';
            
            return <button type="button"
                    key={label}
                    onClick={() => onFilterChange(label)} 
                    className={`btn ${clazz}`}>
                        {text}
                </button>
        });
        return (
            <div className="btn-group">
                {btns}
            </div>
        );
    };
};