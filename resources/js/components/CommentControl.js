import React from 'react';
import {
    Header,
    Dimmer,
    Button,
    Divider,
    Icon,
    Comment,
    Pagination,
    Form,
    Segment,
    Placeholder,
    Loader
} from "semantic-ui-react";
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import usePagination from "../Hooks/usePagination";

const commentTemplate = function (data) {
    return (
        <Comment key={data.id}>
            <Comment.Avatar src={data.user.avatar}/>
            <Comment.Content>
                <Comment.Author as='a'>{data.user.name}</Comment.Author>
                <Comment.Metadata>
                    <div>{data.updated_at}</div>
                </Comment.Metadata>
                <Comment.Text as={"h4"}>{data.title}</Comment.Text>
                <Comment.Text>{data.body}</Comment.Text>
                {/*<Comment.Actions>
                        <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>*/}
            </Comment.Content>
        </Comment>
    );
};

const CommentControl = (props) => {

    const {title, dataProvider, allowAdditions, refreshCounter, history, location, pageKey} = props;

    const {data, status, pageChangeHandler, activePage, totalPages, dataError} = usePagination({
        refreshCounter,
        history,
        getData: dataProvider,
        location,
        pageKey
    });

    const isLoading = status === "loading";

    return (<>
        <Dimmer.Dimmable dimmed={isLoading}>
            <Dimmer active={isLoading} inverted>
                <Loader size='large' content={"Loading"}/>
            </Dimmer>

            <Comment.Group>

                <Header as='h3' dividing content={title}/>

                {data && data.map(datum => commentTemplate(datum))}
                {!data && <>
                    <Header as='h4' content={"No comments"}/>
                </>}
                {isLoading && <>
                    <Placeholder>
                        <Placeholder.Header image>
                            <Placeholder.Line/>
                            <Placeholder.Line/>
                        </Placeholder.Header>
                    </Placeholder>
                </>}

                <Pagination
                    activePage={activePage}
                    onPageChange={pageChangeHandler}
                    totalPages={totalPages}
                    ellipsisItem={null}
                    pointing
                    secondary
                />

                {allowAdditions &&
                <Form reply>
                    <Form.TextArea/>
                    <Button content='Add Reply' labelPosition='left' icon='edit' primary/>
                </Form>
                }

            </Comment.Group>

        </Dimmer.Dimmable>
    </>);
};

CommentControl.defaultProps = {
    title: "Comments",
    dataProvider: null,
    allowAdditions: true,
    pageKey: 'page',
    refreshCounter: 0
};

CommentControl.propTypes = {
    title: PropTypes.string,
    dataProvider: PropTypes.func.isRequired,
    allowAdditions: PropTypes.bool,
    pageKey: PropTypes.string,
    refreshCounter: PropTypes.number
};

export default withRouter(CommentControl);