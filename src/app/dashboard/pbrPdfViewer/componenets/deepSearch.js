import * as React from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import { SearchIcon } from '@react-pdf-viewer/search';
import { MoreActionsPopover, ToolbarSlot } from '@react-pdf-viewer/toolbar';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Search } from '@react-pdf-viewer/search';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import SearchSidebarInner from './SearchSidebarInner';

const SearchSidebar = ({ isDocumentLoaded, searchPluginInstance }) => {
    const { Search: SearchComponent } = searchPluginInstance;

    return (
        <SearchComponent>
            {(renderSearchProps) => (
                <SearchSidebarInner isDocumentLoaded={isDocumentLoaded} renderSearchProps={renderSearchProps} />
            )}
        </SearchComponent>
    );
};

/* istanbul ignore next */
const SearchSidebarWithDefaultLayoutExample = ({ fileUrl }) => {
    const renderToolbar = Toolbar  => (
        <Toolbar>
            {toolbarSlot => {
                const {
                    CurrentPageInput,
                    Download,
                    EnterFullScreen,
                    GoToNextPage,
                    GoToPreviousPage,
                    NumberOfPages,
                    Open,
                    Print,
                    SwitchTheme,
                    Zoom,
                    ZoomIn,
                    ZoomOut,
                } = toolbarSlot;

                return (
                    <div className="rpv-toolbar" role="toolbar" aria-orientation="horizontal">
                        <div className="rpv-toolbar__left">
                            <div className="rpv-core__display--hidden rpv-core__display--block-small">
                                <div className="rpv-toolbar__item">
                                    <GoToPreviousPage />
                                </div>
                            </div>
                            <div className="rpv-toolbar__item">
                                <CurrentPageInput />{' '}
                                <span className="rpv-toolbar__label">
                                    / <NumberOfPages />
                                </span>
                            </div>
                            <div className="rpv-core__display--hidden rpv-core__display--block-small">
                                <div className="rpv-toolbar__item">
                                    <GoToNextPage />
                                </div>
                            </div>
                        </div>
                        <div className="rpv-toolbar__center">
                            {/* <div className="rpv-toolbar__item">
                                <ZoomOut />
                            </div> */}
                            <div className="rpv-core__display--hidden rpv-core__display--block-small">
                                <div className="rpv-toolbar__item">
                                    <Zoom />
                                </div>
                            </div>
                            {/* <div className="rpv-toolbar__item">
                                <ZoomIn />
                            </div> */}
                        </div>
                        <div className="rpv-toolbar__right">
                            {/* <div className="rpv-core__display--hidden rpv-core__display--block-medium">
                                <div className="rpv-toolbar__item">
                                    <SwitchTheme />
                                </div>
                            </div> */}
                            <div className="rpv-core__display--hidden rpv-core__display--block-medium">
                                <div className="rpv-toolbar__item">
                                    <EnterFullScreen />
                                </div>
                            </div>
                            {/* <div className="rpv-core__display--hidden rpv-core__display--block-medium">
                                <div className="rpv-toolbar__item">
                                    <Open />
                                </div>
                            </div> */}
                            <div className="rpv-core__display--hidden rpv-core__display--block-medium">
                                <div className="rpv-toolbar__item">
                                    <Download />
                                </div>
                            </div>
                            {/* <div className="rpv-core__display--hidden rpv-core__display--block-medium">
                                <div className="rpv-toolbar__item">
                                    <Print />
                                </div>
                            </div> */}
                            {/* <div className="rpv-toolbar__item">
                                <MoreActionsPopover toolbarSlot={toolbarSlot} />
                            </div> */}
                        </div>
                    </div>
                );
            }}
        </Toolbar>
    );

    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        renderToolbar,
        sidebarTabs: (defaultTabs) =>
            [
                {
                    content: (
                        <SearchSidebar
                            searchPluginInstance={
                                defaultLayoutPluginInstance.toolbarPluginInstance.searchPluginInstance
                            }
                        />
                    ),
                    icon: <SearchIcon />,
                    title: 'Search',
                },
            ].concat(defaultTabs),
    });

    return <Viewer theme="dark" fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />;
};

export default SearchSidebarWithDefaultLayoutExample;